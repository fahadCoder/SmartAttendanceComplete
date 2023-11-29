// import Teacher from "../models/TeacherModel.js";
// import Timetable from "../models/TimetableModel.js";
import Excel from "../models/ExcelModel.js";

// import User from "../models/UserModel.js";

export const getTimetable= async(req, res) =>{
    try {
        const response = await Excel.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTimetableById = async(req, res) =>{
    try {
        console.log("id is here ",req.params.id)
        const response = await Excel.findAll({
            where:{
                id: req.params.id
            }
        });
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createTimetable = async(req, res) =>{
    try {
        await Excel.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTimetable = async(req, res) =>{
    try {
        await Excel.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

// export const deleteTimetable = async(req, res) =>{
//     try {
//         await Timetable.destroy({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Timetable Deleted"});
//     } catch (error) {
//         console.log(error.message);
//     }
// } 
// -------------------------import timetable excel file API
