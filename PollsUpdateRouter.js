const express = require('express')
const router = express.Router();

//const LecturerModel = require('./LecturerModel');
const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const pollId = req.body.pollId;
    const indexNumber = req.body.indexNumber;
    const courseCode = req.body.courseCode;
    const optionId = req.body.optionId;

    console.log('poll update')

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        //return poll from course 
        const poll = courseData.polls.find((pollObject) => {
            if (pollObject._id == pollId) {
                console.log('poll id: ', pollId, 'pollObj id: ', pollObject._id)
                return true;
            }
            else return false;
        })
        poll.totalVotesCast++;
        poll.participants.push(indexNumber);
        // console.log('poll ops: ', poll.options)
        const pollOptionsUpdate = poll.options.map((option) => {
            if (option._id == optionId) {
                option.taken.push(indexNumber);
                option.votes++;
                return option;
            }
            else {
                return option;
            }
        });

        poll.options = pollOptionsUpdate;

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
            res.json({
                info: {
                    courseCode: courseData.courseCode,
                    courseName: courseData.courseName,
                    polls: courseData.polls
                }
            })
        }
        else {
            res.json({ successful: false })
        }
    }
    catch (error) {
        console.log(error.message);
    }




})
module.exports = router;