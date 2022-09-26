const express = require('express');
const mongoose = require('mongoose');

const app = express();

const LecturerModel = require('./LecturerModel');

mongoose.connect('mongodb+srv://john_doe:formatics@poll-cluster.pofnv.mongodb.net/claim-app-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connected to mongodb'));

async function create() {
    try {
        const a = await LecturerModel({
            username: 'bkommey',
            password: '1234',
            staff_id: 201102,
            assignedCourses: [
                {
                    courseName: 'Operating Systems',
                    courseCode: 'COE 354',
                    year: 3,
                    semester: 2,
                    credits: 4
                },
                {
                    courseName: 'Embedded Systems',
                    courseCode: 'COE 358',
                    year: 3,
                    semester: 2,
                    credits: 3
                }
            ]
        });
        await a.save();

        console.log(a);

    } catch (error) {
        console.log(error.message);

    }
}

create();


app.listen(process.env.PORT, () => console.log('running on port 2022'));