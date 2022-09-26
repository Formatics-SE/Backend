const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// initialize app
const app = express();

//allow cross-origin sharing
app.use(cors({origin: '*'}));

// connect to local mongodb database
mongoose.connect('mongodb+srv://john_doe:formatics@poll-cluster.pofnv.mongodb.net/claim-app-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connected to mongodb'));

// importing routers //
// login routers
const StudentLoginRouter = require('./StudentLoginRouter');
const LecturerLoginRouter = require('./LecturerLoginRouter');

// marks routers
const MarksUpdateRouter = require('./MarksUpdateRouter');
const MarksFetchStudentRouter = require('./MarksFetchStudentRouter');
const MarksFetchLecturerRouter = require('./MarksFetchLecturerRouter');

// attendance routers
const AttendanceUpdateRouter = require('./AttendanceUpdateRouter');
const AttendanceFetchRouter = require('./AttendanceFetchRouter');

// groups routers
const GroupsFetchLecturerRouter = require('./GroupsFetchLecturerRouter');
const GroupsFetchStudentRouter = require('./GroupsFetchStudentRouter');
const GroupsUpdateRouter = require('./GroupsUpdateRouter');
const GroupsMarksUpdateRouter = require('./GroupsMarksUpdateRouter');

// poll routers
const PollsFetchRouter = require('./PollsFetchRouter');
const AddPollRouter = require('./AddPollRouter');
const DeletePollRouter = require('./DeletePollRouter');
const PollsUpdateRouter = require('./PollsUpdateRouter');

// using routers //
// login routers
app.use('/studentlogin', StudentLoginRouter);
app.use('/lecturerlogin', LecturerLoginRouter);

// marks routers
app.use('/updatemarks', MarksUpdateRouter);
app.use('/fetchstudentmarks', MarksFetchStudentRouter);
app.use('/fetchlecturermarks', MarksFetchLecturerRouter);

// attendance routers
app.use('/fetchattendance', AttendanceFetchRouter);
app.use('/updateattendance', AttendanceUpdateRouter);

// group routers
app.use('/fetchlecturergroups', GroupsFetchLecturerRouter);
app.use('/fetchstudentgroup', GroupsFetchStudentRouter);
app.use('/updategroups', GroupsUpdateRouter);
app.use('/groupsmarksupdate', GroupsMarksUpdateRouter);

// poll routers
app.use('/fetchpolls', PollsFetchRouter);
app.use('/addpoll', AddPollRouter);
app.use('/deletepoll', DeletePollRouter);
app.use('/updatepolls', PollsUpdateRouter);

// assigning port
app.listen(process.env.PORT, () => console.log('running on port 2022'));