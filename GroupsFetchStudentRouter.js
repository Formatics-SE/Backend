const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel')

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const indexNumber = req.body.indexNumber;

    console.log('courseCode: ', courseCode)
    console.log('indexNumber: ', indexNumber)

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        let registeredStudents = courseData.registeredStudents;
        let groups = courseData.groups;
        let groupMatch, groupNumber;



        for (let i = 0; i < registeredStudents.length; i++) {
            if (indexNumber === registeredStudents[i].indexNumber) {
                groupNumber = registeredStudents[i].groupNumber;
                break;
            }
        }
        for (let i = 0; i < groups.length; i++) {
            if (groupNumber === groups[i].groupNumber) {
                groupMatch = groups[i];
                break;
            }
        }
        console.log('group match: ', groupMatch)
        
        if (courseData) {
            res.json({ 
                info: {
                    courseCode: courseData.courseCode,
                    courseName: courseData.courseName,
                    group: groupMatch
                }
             });
        }
        else {
            res.json({ info: null });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
);

module.exports = router;

