const express = require('express');
const mongoose = require('mongoose');

const app = express();

const StudentModel = require('./StudentModel');

mongoose.connect('mongodb+srv://john_doe:formatics@poll-cluster.pofnv.mongodb.net/claim-app-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connected to mongodb'));

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
                        assignedLecturer: 'J. Yankey',
                        credits: 3
                    },
                    {
                        courseName: 'Operating Systems',
                        courseCode: 'COE 354',
                        assignedLecturer: 'B. Kommey',
                        credits: 4
                    },
                    {
                        courseName: 'Embedded Systems',
                        courseCode: 'COE 358',
                        assignedLecturer: 'B. Kommey',
                        credits: 3
                    },
                    {
                        courseName: 'Database and Information Retrieval',
                        courseCode: 'COE 368',
                        assignedLecturer: 'E. Keelson',
                        credits: 3
                    },
                    {
                        courseName: "Digital Computer Design",
                        courseCode: 'COE 382',
                        assignedLecturer: 'A.S Agbemenu',
                        credits: 3
                    },
                    {
                        courseName: 'Autotronics Lab.',
                        courseCode: 'COE 392',
                        assignedLecturer: '',
                        credits: 2
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