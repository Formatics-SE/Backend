const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const marksData = req.body.marksData;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode })
        let registeredStudents = courseData.registeredStudents;
        let date = new Date().toLocaleDateString();

        marksData.forEach(marksObject => {
            if (marksObject.currentDayMarks != 0) {
                for (let i = 0; i < registeredStudents.length; i++) {
                    if (marksObject.indexNumber === registeredStudents[i].indexNumber) {
                        let push = true;
                        for (let j = 0; j < registeredStudents[i].marksArray.length; j++) {
                            if (registeredStudents[i].marksArray[j]?.date == date) {
                                registeredStudents[i].marksArray[j].marks += marksObject.currentDayMarks;
                                push = false;
                            }
                            break;
                        }
                        if (push) {
                            registeredStudents[i].marksArray.push({
                                marks: marksObject.currentDayMarks,
                                date: date
                            })
                        }
                    }
                }
            }
        });

        // marksData.forEach(marksObject => {
        //     if (marksObject.currentDayMarks != 0) {
        //         for (let i = 0; i < registeredStudents.length; i++) {
        //             if (marksObject.indexNumber === registeredStudents[i].indexNumber) {
        //                 registeredStudents[i].marksArray.push({
        //                     marks: marksObject.currentDayMarks,
        //                     date: date
        //                 })
        //                 break;
        //             }
        //         }
        //     }
        // });

        const update = await CourseModel.updateOne(
            { courseCode: courseCode },
            {
                $set: {
                    registeredStudents: registeredStudents
                }
            }
        );
        if (update) {
            res.json({ successful: true })
        }
        else {
            res.json({ successful: false })
        }


    } catch (error) {
        console.log(error.message)
    }


})

module.exports = router;