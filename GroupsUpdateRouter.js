const express = require('express')
const router = express.Router();

//importing course Model
const CourseModel = require('./CourseModel')

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const groupsData = req.body.groupsData;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        let registeredStudents = courseData.registeredStudents;
        let groups = courseData.groups; 

        groupsData.forEach(groupsObject => {
            groups.push(groupsObjects);
            // the 'members' field is an array containing student name and index.
            // Iterate over the array and for obj returned, find a match in the registered students array and update the group numbers.
            groupsObject.members.forEach(studentDetails => {
                for (let i = 0; i < registeredStudents.length - 1; i++) {
                    if (studentDetails.indexNumber === registeredStudents[i].indexNumber) {
                        registeredStudents[i].group = groupsObject.number;
                        break;
                    }
                }
            })
        })

        // apply the updates to the database 
        const update = await CourseModel.updateOne(
            { courseCode: courseCode },
            {
                [registeredStudents]: registeredStudents,
                [groups]: groupsData
            }
        )
        if (update) {
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

