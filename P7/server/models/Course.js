const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: [{ type: String }], // List of video URLs or file paths
});

module.exports = mongoose.model('Course', CourseSchema);