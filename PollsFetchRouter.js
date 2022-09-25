const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel')

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const courseData = await CourseModel.findOne({ courseCode: courseCode });
    console.log(courseData.polls)
    try {
        if (courseData) {
            res.json({
                info: {
                    courseCode: courseData.courseCode,
                    courseName: courseData.courseName,
                    polls: courseData.polls
                }
            })
        }
        else {
            res.json({ info: null });
        }
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;