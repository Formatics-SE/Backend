const express = require('express');
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const groupsData = req.body.groupsData;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        let registeredStudents = courseData.registeredStudents;
        let groups = courseData.groups;

        groupsData.forEach(groupsObject => {
            groups.push(groupsObject);
            // the 'members' field is an array containing student name and index.
            // Iterate over the array and for each obj returned, find a match in the registered students array and update the group number.
            groupsObject.members.forEach(studentDetails => {
                for (let i = 0; i < registeredStudents.length; i++) {
                    if (studentDetails.indexNumber === registeredStudents[i].indexNumber) {
                        console.log('gn: ', groupsObject.groupNumber)
                        registeredStudents[i].groupNumber = groupsObject.groupNumber;
                        break;
                    }
                }
            })
        })

        // apply the updates to the database 
        const updateReport = await CourseModel.updateOne(
            { courseCode: courseCode },
            {
                $set: {
                    registeredStudents: registeredStudents,
                    groups: groupsData
                }
            },
            { new: true }
        )

        if (updateReport) {
            res.json({
                info: {
                    courseName: courseData.courseName,
                    courseCode: courseData.courseCode,
                    registeredStudents: courseData.registeredStudents,
                    groups: groups
                }
            });
        }

        else {
            res.json({ successful: false });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
);

module.exports = router;

