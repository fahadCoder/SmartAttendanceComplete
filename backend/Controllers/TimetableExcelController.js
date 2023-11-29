// const multer = require('multer');
import multer from 'multer';
// const XLSX = require('xlsx');
import XLSX from 'xlsx';
// const Excel = require('../models/excel.model');
// import Excel from "../models/ExcelModel";
import Excel from "../models/ExcelModel.js";
import { Op } from 'sequelize';
import moment from 'moment'; // to handle time
// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './downloads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

// // Check if uploaded file is an Excel file
// const excelFilter = function(req, file, cb) {
//   if (!file.originalname.match(/\.(xlsx|xls)$/)) {
//     return cb(new Error('Only Excel files are allowed!'), false);
//   }
//   cb(null, true);
// };

// // Initialize multer upload middleware
// // const upload = multer({storage: storage, fileFilter: excelFilter});
// const upload = multer({ 
//   storage: storage, 
//   fileFilter: excelFilter,
//   limits: { fileSize: 5000000 } // 5MB limit
// });




export const uploadExcel = async (req, res) => {
  try {
    const data = req.body;

    // Add null to each row's id field (to generate auto-incrementing ids)
    const dataWithId = data.map(row => ({ ...row, id: null }));
    console.log("TIme table data is ",dataWithId);
    // Save data in the database
    await Excel.bulkCreate(dataWithId);


    res.status(201).json({ msg: "Data uploaded successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error!');
  }
};




  
  export const getTimetableData = async (req, res) => {
    try {
    //  let facultyId=1015; 
    console.log("id is here fahad side ",req.params.id)
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // get current day of the week (0-6, where 0 is Sunday)
      const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
       // get current time in HH:mm format
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayName = days[currentDate.getDay()];
      console.log("currentDayName",currentDayName);
      const response = await Excel.findAll(
        {
          where:{
            [currentDayName]: "true",
            TeacherId: req.params.id
          },
         order: [['Starttime', 'ASC']]

        }
      ); 
      console.log("Response here :: ",response);
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error!');
    }
  };




  export const getCurrentTimetable = async (req, res) => {
    try {
      let facultyId=req.params.id;
      console.log("id for current timetable is ::",facultyId);
      const today = new Date();
      const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      // const currentTime = moment().format('hh:mm A');
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const seconds = currentTime.getSeconds().toString().padStart(2, '0');
      const militaryTime = `${hours}:${minutes}:${seconds}`;
    
  
      console.log("Current time ",currentTime);
      const timetableEntries = await Excel.findAll({
        where: {
          Starttime: {
            [Op.lte]: militaryTime
          },
          [dayOfWeek]: "true",
          TeacherId: facultyId,
  
        }
      });
  console.log("TIme table entries",timetableEntries);
      // console.log("Session data: ", req.session); // log session object
      // console.log("Faculty ID from session: ", req.session.facultyid);
      // console.log("teacher ID is : ",req.session.facultyid);
      // console.log(localStorage.getItem("FacultyID"));
  
      const filteredEntries = timetableEntries.filter(entry => {
        const startTime = moment(entry.Starttime, 'hh:mm A');
        const endTime = startTime.clone().add(10, 'minutes');
        const currentTime = moment();
        console.log("Start Time ",startTime);
        console.log("ENd Time ",endTime);
  
  
        // return (startTime,endTime);
        return currentTime.isBetween(startTime, endTime);
      });
  
      res.status(200).json(filteredEntries);
    } catch (error) {
      console.log(error.message);
    }
  };
  

export const deleteTimetable = async(req, res) =>{
  try {
      await Excel.destroy({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Timetable Deleted"});
  } catch (error) {
      console.log(error.message);
  }
}
export const deleteTimetableAll = async (req, res) => {
  try {
    await Excel.destroy({
      where: {}, // Empty object to delete all rows in the table
      truncate: true // Truncate the table and reset the auto-incrementing primary key
    });
    res.status(200).json({ msg: "Timetable Data deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
