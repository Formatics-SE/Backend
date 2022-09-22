const express = require('express')
const router = express.Router();

const LecturerModel = require('./LecturerModel');
const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const title = req.body.title;
    const options = req.body.options;
    const courseCode = req.body.courseCode;

    try {
        const updateReport = await CourseModel.updateOne(
            {
                courseCode: courseCode
            },
            {
                $push: {
                    polls: {
                        title: title,
                        options: options
                    }
                }
            },
            {
                new: true
            }
        );

        const courseData = await CourseModel.findOne({ courseCode: courseCode })

        // if poll is created successfully...
        if (courseData) {
            res.json({ polls: courseData.polls });
        }
        else {
            res.json({ polls: false });
        }

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;