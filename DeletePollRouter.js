const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const pollId = req.body.pollId;
    const courseCode = req.body.courseCode;

    console.log('courseCode: ', courseCode)

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
            },
            {
                new: true
            }
        );

        console.log(newPoll)

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