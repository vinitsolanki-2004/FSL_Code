const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Enrollment = require('../models/Enrollment');

const router = express.Router();

// Enroll in a course
router.post('/', authMiddleware, async (req, res) => {
    const { courseId } = req.body;

    try {
        const enrollment = new Enrollment({ student: req.user.id, course: courseId });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;