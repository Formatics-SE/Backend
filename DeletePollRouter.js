const express = require('express')
const router = express.Router();

const LecturerModel = require('./LecturerModel');
const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const options = req.body.pollId;
    const courseCode = req.body.courseCode;

    try {
        const newPoll = await CourseModel.updateOne(
            {
                courseCode: courseCode
            },
            {
                $pull: {
                    polls: {
                        _id: pollId
                    }
                }
            }
        );

        // if poll is created successfully...
        if (newPoll) {
            res.json({ successful: true });
        }
        else {
            res.json({ successful: false });
        }

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;