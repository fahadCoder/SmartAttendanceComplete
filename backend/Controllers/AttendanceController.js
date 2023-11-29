import Attendance from "../models/AttendanceModel.js";
import Teacher from "../models/TeacherModel.js";
import Log from "../models/LogsModel.js";

export const getAttendance= async(req, res) =>{
    try {
        const response = await Attendance.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAttendanceById = async(req, res) =>{
    try {
        console.log("attendance is is :: ",req.params.id);

        console.log("attendance is is :: ",req.body.facultyId);
        const response = await Attendance.findAll({
            where:{
                facultyId: req.params.id
            }
        });
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// ------------------------------------------mark attendance by checking teacher register or not
export const createAttendance = async (req, res) => {
    const  facultyId = req.body.facultyId;
    console.log("Attendance faculty Id is :: ",req.body);
  
    // Check if teacher exists in the teacher model
    const teacher = await Teacher.findOne({
       where:{ 
        facultyId:facultyId
            }
        });
       
  
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    else{
        const AttendancePlag = await Attendance.findOne({
            where:{ 
             facultyId:facultyId,
             TeacherName:req.body.TeacherName,
             Course:req.body.Course,
             RoomNo:req.body.RoomNo,
             Date:req.body.Date
                 }
             });
        // Create attendance record
        if(AttendancePlag)
        {
            return res.status(404).json({ error: 'Attendance Already Marked' });

        }
        else{
            try {
                await Attendance.create(req.body);
                res.status(201).json({ msg: 'Attendance marked successfully' });
                // console.log("FacultyId from attendance mark ",facultyId);
                // console.log("Teacher Match ",teacher);
    
                } 
            catch (error) {
                console.log(error.message);
                res.status(500).json({ error: 'Failed to mark attendance' });
                // console.log("FacultyId ",facultyId);
    
                }
        }
       
    }
  
   
  };



  



// ----------------------------------------------


export const updateAttendance = async(req, res) =>{
    try {
        await Attendance.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Attendance Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAttendance = async(req, res) =>{
    try {
        await Attendance.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Attendance Removed"});
    } catch (error) {
        console.log(error.message);
    }
}


 
export const addLog = async(req, res) =>{
    try {
        await Log.create(req.body);
        res.status(201).json({msg: "Log Inserted"});
    } catch (error) {
        console.log(error.message);
    }
}

