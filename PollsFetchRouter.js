const express = require('express')
const router = express.Router();


//import Course Model
const CourseModel = require('./CourseModel')
//query courseData by course Code
router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const courseData = await CourseModel.findOne({ courseCode: courseCode });
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