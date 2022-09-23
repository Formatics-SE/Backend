const express = require('express');
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const groupsData = req.body.groupsData;

    // console.log(groupsData)

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        let registeredStudents = courseData.registeredStudents;
        let groups = courseData.groups;

        groupsData.forEach(groupsObject => {
            groups.push(groupsObject);
            // the 'members' field is an array containing student name and index.
            // Iterate over the array and for obj returned, find a match in the registered students array and update the group numbers.
            groupsObject.members.forEach(studentDetails => {
                for (let i = 0; i < registeredStudents.length; i++) {
                    if (studentDetails.indexNumber === registeredStudents[i].indexNumber) {
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
                    registeredStudents: registeredStudents
                },
                $set: {
                    groups: groupsData
                }
            },
            { new: true }
        )

        // console.log(updateReport)
        if (updateReport) {
            res.json({ successful: true });
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

