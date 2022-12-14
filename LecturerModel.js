const mongoose = require('mongoose');

const LecturerSchema = new mongoose.Schema({
    username: String,
    password: String,
    staff_id: Number,
    assignedCourses: [
        {
            courseName: String,
            courseCode: String,
            year: Number,
            semester: Number,
            credits: Number
        }
    ]
});

module.exports = mongoose.model('Lecturers', LecturerSchema);