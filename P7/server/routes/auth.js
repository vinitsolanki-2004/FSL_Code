const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash password before storing it (optional)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Respond with success and user data (or message)
        res.json({ message: 'Registration successful!', data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;