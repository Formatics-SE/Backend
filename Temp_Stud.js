const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/',
    () => console.log('connected to mongodb'));

const StudentModel = require('./StudentModel');
const json = require('./Temp_RegStuds.json');
async function create() {
    try {
        json.forEach(async stud => {
            let nameSplit = stud.name.split(' ');
            let username = (nameSplit[1][0] + nameSplit[0]).toLowerCase();
            const a = StudentModel({
                username: username,
                password: '1234',
                indexNumber: stud.indexNumber,
                year: 3,
                semester: 2,
                registeredCourses: [
                    {
                        courseName: 'Introduction to Software Engineering',
                        courseCode: 'COE 356',
                        assignedLecturer: 'J. Yankey'

                    },
                    {
                        courseName: 'Operating Systems',
                        courseCode: 'COE 354',
                        assignedLecturer: 'B. Kommey'

                    },
                    {
                        courseName: 'Embedded Systems',
                        courseCode: 'COE 358',
                        assignedLecturer: 'B. Kommey'
                    },
                    {
                        courseName: 'Database and Information Retrieval',
                        courseCode: 'COE 368',
                        assignedLecturer: 'E. Keelson'
                    },
                    {
                        courseName: "Digital Computer Design",
                        courseCode: 'COE 382',
                        assignedLecturer: 'A.S Agbemenu'
                    },
                    {
                        courseName: 'Autotronics Lab.',
                        courseCode: 'COE 392',
                        assignedLecturer: ''
                    }
                ]
            })
            await a.save();
            console.log(a);
        });

        // const a = await StudentModel.find();

    } catch (error) {
        console.log(error.message);

    }
}

create();


app.listen(process.env.PORT, () => console.log('running on port 2022'));