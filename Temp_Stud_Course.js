const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost:27017/',
    () => console.log('connected to mongodb'));

const CourseModel = require('./CourseModel');
const json = require('./Temp_RegStuds.json');

async function create() {
    try {
        const a = await CourseModel({
            courseName: 'Introduction to Software Engineering',
            courseCode: 'COE 356',
            assignedLecturer: 'J. Yankey',
            year: 3,
            semester: 2,
            registeredStudents: json
        });
        const b = await CourseModel({
            courseName: 'Operating Systems',
            courseCode: 'COE 354',
            assignedLecturer: 'B. Kommey',
            year: 3,
            semester: 2,
            registeredStudents: json
        });
        const c = await CourseModel({
            courseName: 'Embedded Systems',
            courseCode: 'COE 358',
            assignedLecturer: 'B. Kommey',
            year: 3,
            semester: 2,
            registeredStudents: json
        });
        const d = await CourseModel({
            courseName: 'Database and Information Retrieval',
            courseCode: 'COE 368',
            assignedLecturer: 'E. Keelson',
            year: 3,
            semester: 2,
            registeredStudents: json
        });

        const e = await CourseModel({
            courseName: 'Digital Computer Design',
            courseCode: 'COE 382',
            assignedLecturer: 'A.S Agbemenu',
            year: 3,
            semester: 2,
            registeredStudents: json
        });
        const f = await CourseModel({
            courseName: 'Autotronics Lab.',
            courseCode: 'COE 392',
            assignedLecturer: '',
            year: 3,
            semester: 2,
            registeredStudents: json
        });
        await a.save();
        await b.save();
        await c.save();
        await d.save();
        await e.save();
        await f.save();

        // const a = await CourseModel.deleteMany();

        // console.log(a);

    } catch (error) {
        console.log(error.message);

    }
}

create();


app.listen(process.env.PORT, () => console.log('running on port 2022'));