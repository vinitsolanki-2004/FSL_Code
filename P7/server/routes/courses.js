const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a course (Instructor only)
router.post('/', authMiddleware, async (req, res) => {
    if (req.user.role !== 'instructor') return res.status(403).json({ message: 'Access denied' });

    const { title, description, content } = req.body;
    try {
        const course = new Course({ title, description, content, instructor: req.user.id });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;