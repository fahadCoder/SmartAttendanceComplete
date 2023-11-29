import express from "express";
import wifi from 'node-wifi';

import {
    getTeacher, 
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    loginTeacher,
    getTeacherTotal,
    GetResponseFromModel,
    OneTimePassword,
    getTeacherName
} from "../Controllers/TeacherController.js";

import {
    getTimetable, 
    getTimetableById,
    createTimetable,
    updateTimetable,
    
} from "../Controllers/TimetableController.js";

import {
    getAttendance, 
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    addLog,
    
} from "../Controllers/AttendanceController.js";

import {
    createAdmin,
    getTotalAdmin,
    getAdmins,
    deleteAdmin,
    AdminLogin,
    GetPermissions,
    TrainModel,
    DatasetCollection,
    updateAdmin,
    createPermissions,
    UppdatePermission

   
} from "../Controllers/AdminController.js";


 import {
    getTimetableData,
    uploadExcel,
    getCurrentTimetable,
    deleteTimetable,
    deleteTimetableAll
 } from "../Controllers/TimetableExcelController.js";
import {
    GetLogs,
    GetPermissionsView
} from "../Controllers/LogsController.js"



 import multer from 'multer';
 import session from 'express-session';

// import {DashboardTeacher} from "../../SmartAttendance/src/Teacher/DashboardTeacher";

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// for live attendance mark 
const storage = multer.memoryStorage();
const upload2 = multer({ storage: storage });
const upload3 = multer({ dest: 'uploads/' });


// const router2= express.

// const sessionMiddleware = session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: false
//   });

// router.post('/dashboard/team', createCoordinator);

export const CheckLoginAccess = async (req, res, next) => {
    // Check if user is connected to university WIFI
    try {
      await wifi.init({ iface: null }); // initialize the wifi module
      const currentConnections = await wifi.getCurrentConnections(); // get a list of currently connected WiFi networks
      const isUniversityWifi = currentConnections.some(connection => connection.ssid === 'FIRST FLOOR'); // check if any of the currently connected WiFi networks have the correct SSID
      const isUniversityWifi2 = currentConnections.some(connection => connection.ssid === 'OPPO F19 Pro'); // check if any of the currently connected WiFi networks have the correct SSID
      const isUniversityWifi3 = currentConnections.some(connection => connection.ssid === 'Riphah-S'); // check if any of the currently connected WiFi networks have the correct SSID
      if (isUniversityWifi || isUniversityWifi2 || isUniversityWifi3) {
        // User is connected to university WIFI, allow login
        next();
      } else {
        // User is not connected to university WIFI, deny login
        res.status(401).json({ message: 'Unauthorized: You must be connected to the university WIFI to log in' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };




router.post('/Teacher',CheckLoginAccess, loginTeacher);
// router.post('/Teacher', loginTeacher);


router.post('/dashboard/team', createAdmin);




router.get('/dashboard/Teachers', getTeacher);
router.get('/dashboard/Teachers/:id', getTeacherById);
router.post('/dashboard/Teachers', createTeacher);
router.patch('/dashboard/Teachers/:id', updateTeacher);
router.delete('/dashboard/Teachers/:id', deleteTeacher);


// router.get('/dashboard', getTotalAdmin);
router.get('/dashboard/team', getAdmins);
router.patch('/dashboard/team/:id', updateAdmin);
router.patch('/dashboard/roles/:id', UppdatePermission);
router.post('/dashboard/team/Permissions', createPermissions);

router.delete('/dashboard/team/:id', deleteAdmin);
router.post('/',AdminLogin);
router.get('/dashboards/:facultyId', GetPermissions);



 

router.get('/dashboard/Timetable', getTimetable);
// router.get('/Teacherdashboard/TimetableTeacher/:id', getTimetableById); //----------------------------------
// router.post('/dashboard/Timetable', createTimetable);
router.patch('/dashboard/Timetable/:id', updateTimetable);
router.delete('/dashboard/Timetable/:id', deleteTimetable);
router.delete('/dashboard/Timetable', deleteTimetableAll);



router.get('/dashboard/Attendance', getAttendance);
// router.get('/dashboard/Attendance/:id', getAttendanceById);
router.post('/dashboard/Attendance', createAttendance);
router.patch('/dashboard/Attendance/:id', updateAttendance);
router.delete('/dashboard/Attendance/:id', deleteAttendance);


router.post('/dashboard/addlog', addLog);
router.get('/dashboard/logs', GetLogs);
router.get('/dashboard/roles', GetPermissionsView);

// router.post('/dashboard/w/:folderName', TrainModel);
router.post('/dashboard/w', TrainModel);

// app.post('/process_folder/:folderName', 

router.get('/dashboard/TotalAdmins', getTotalAdmin);

router.post('/dashboard/DatasetCollection',upload3.single('image'),DatasetCollection);
// router.post('/dashboard/DatasetCollection',DatasetCollection);



// router.post('/dashboard/Timetable',upload.single('timetable'), uploadExcel);
router.post('/dashboard/Timetable', uploadExcel);

// router.get('/Teacherdashboard/TimetableTeacher', getTimetableData);
router.get('/Teacherdashboard/TimetableTeacher/:id', getTimetableData);

router.get('/Teacherdashboard/markattendance/:id', getCurrentTimetable);
router.post('/Teacherdashboard', upload2.single('image'),GetResponseFromModel);

router.get('/Teacherdashboard/TeacherAttendance/:id', getAttendanceById);
// router.post('/OneTimePassword', OneTimePassword);
// router.post('/OneTimePassword/:id', OneTimePassword);
router.post('/OneTimePassword', OneTimePassword);


router.get('/Teacherdashboard/:id', getTeacherName);





export default router;



