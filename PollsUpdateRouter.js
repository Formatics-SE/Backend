const express = require('express')
const router = express.Router();
const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const indexNumber = req.body.indexNumber;
    const courseCode = req.body.courseCode;
    const optionId = req.body.optionId;
    const pollId = req.body.pollId;

    console.log('indexNumber: ', indexNumber)
    console.log('courseCode: ', courseCode)
    console.log('optionId: ', optionId)


    try {
        let poll; //yet to find how to access single poll from database
        const pullPoll = await CourseModel.updateOne({ courseCode: courseCode }, {
            $pull: {
                polls: { _id: pollId }
            }

        });
        const updatedCourseData = await CourseModel.updateOne({ courseCode: courseCode }, {
            $push: {
                polls: poll
            },
            new: true

        });
        if (updatedCourseData) {
            res.json({ polls: updatedCourseData.polls })
        }
        else {
            res.json({ polls: null })

        }
    }
    catch (error) {
        console.log(error.message);
    }




})
module.exports = router;