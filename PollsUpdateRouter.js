const express = require('express')
const router = express.Router();

//const LecturerModel = require('./LecturerModel');
const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const pollId = req.body.pollId;
    const indexNumber = req.body.indexNumber;
    const courseCode = req.body.courseCode;
    const optionId = req.body.optionId;


    console.log('pollId: ', pollId)
    console.log('indexNumber: ', indexNumber)
    console.log('courseCode: ', courseCode)
    console.log('optionId: ', optionId)


    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        //return poll from course 
        const poll = courseData.polls.find((pollobject) => { 
            pollobject._id === pollId;
        })
        poll.totalVotesCast++;
        poll.participants.push(indexNumber);
        let pollOptionsUpdate = poll.options.map((option) => {
            if (options._id == optionId) {
                option.taken.push(indexNumber);
                option.votes++;
                return option;
            }
            else {
                return option;
            }

        })
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