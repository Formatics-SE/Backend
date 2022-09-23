const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: String,
    courseCode: String,
    assignedLecturer: String,
    year: Number,
    semester: Number,
    credits: Number,
    maxAbsentStrikes: { type: Number, default: 3 },
    registeredStudents: [
        {
            name: String,
            indexNumber: Number,
            cwa: Number,
            attendance: { type: Number, default: 0 },
            strikes: { type: Number, default: 0 },
            groupNumber: { type: Number, default: 0 },
            marksArray: [
                {
                    marks: { type: Number, default: 0 },
                    date: String
                }
            ]
        }
    ],
    groups: [
        {
            groupNumber: Number,
            members: [{ name: String, indexNumber: Number }],
            score: { type: Number, default: 0 }
        }
    ],
    polls: [
        {
            title: String,
            totalVotesCast: { type: Number, default: 0 },
            participants: [Number],
            options: [
                {
                    option: String,
                    votes: Number,
                    taken: [Number]
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Courses', CourseSchema);