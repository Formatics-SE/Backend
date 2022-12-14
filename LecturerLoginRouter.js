const express = require('express')
const router = express.Router();

const LecturerModel = require('./LecturerModel');
const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const staff_id = req.body.staff_id;

    try {
        // query lecturer by 'username' and 'password'
        const lecturerData = await LecturerModel.findOne(
            {
                username: username,
                password: password,
                staff_id: staff_id
            }
        );
        // if a match is found...
        if (lecturerData) {
            const assignedCourses = lecturerData.assignedCourses;
            const username = lecturerData.username;
            // return an array of the courses assigned to the lecturer
            res.json({
                lecturerData: {
                    assignedCourses: assignedCourses,
                    username: username
                }
            });
        }
        else {
            res.json({ lecturerData: null });
        }

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;