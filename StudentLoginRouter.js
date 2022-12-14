const express = require('express')
const router = express.Router();

// import student model
const StudentModel = require('./StudentModel');

// handles requests made to /studentlogin
router.post('/', express.json(), async (req, res) => {
    // get login credentials
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    console.log('in login')

    try {
        // query student by 'username' and 'password'
        const studentData = await StudentModel.findOne({
            username: username,
            password: password
        });
        // if a match is found...
        if (studentData) {
            res.json({
                studentData: {
                    indexNumber: studentData.indexNumber,
                    username: studentData.username,
                    year: studentData.year,
                    semester: studentData.semester,
                    registeredCourses: studentData.registeredCourses
                }
            });
        }
        else {
            res.json({ studentData: null });
        }

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;