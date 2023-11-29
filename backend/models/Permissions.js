import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";

// const {Datatypes}=Sequelize;

const Permission=db.define('permission',{
    facultyId:DataTypes.STRING,

    ViewTeam:DataTypes.BOOLEAN,
    UpdateTeam:DataTypes.BOOLEAN,
    DeleteTeam:DataTypes.BOOLEAN,
    AddTeam:DataTypes.BOOLEAN,

    ViewTeacher:DataTypes.BOOLEAN,
    UpdateTeacher:DataTypes.BOOLEAN,
    DeleteTeacher:DataTypes.BOOLEAN,
    AddTeacher:DataTypes.BOOLEAN,

    ViewTimetable:DataTypes.BOOLEAN,
    UpdateTimetable:DataTypes.BOOLEAN,
    DeleteTimetable:DataTypes.BOOLEAN,
    AddTimetable:DataTypes.BOOLEAN,

    ViewAttendance:DataTypes.BOOLEAN,
    UpdateAttendance:DataTypes.BOOLEAN,
    DeleteAttendance:DataTypes.BOOLEAN,
    AddAttendance:DataTypes.BOOLEAN,

    ViewLogs:DataTypes.BOOLEAN,



   
},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

});

export default Permission;

(async()=>{
    await db.sync();
})();