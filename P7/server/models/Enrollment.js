const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: Number, required: true }
});

// Prevent overwriting the model
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

module.exports = Course;