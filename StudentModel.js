const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: String,
    password: String,
    indexNumber: Number,
    year: Number,
    semester: Number,
    registeredCourses: [
        {
            courseName: String,
            courseCode: String,
            group: Number,
            assignedLecturer: String,
            credits: Number
        }
    ]
});

module.exports = mongoose.model('Students', StudentSchema);