const express = require('express');
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const groupsData = req.body.groupsData;

    // console.log(groupsData)

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        let groups = courseData.groups;

        // update group score by finding a group number match with the data in groupsData
        groupsData.forEach(groupsObject => {
            for (let i = 0; i < groups.length; i++) {
                if (groupsObject.groupNumber === groups[i].groupNumber) {
                    groups[i].score += groupsObject.score;
                    break;
                }
            }
        })

        // apply the updates to the database 
        const updateReport = await CourseModel.updateOne(
            { courseCode: courseCode },
            {
                $set: {
                    groups: groups
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

