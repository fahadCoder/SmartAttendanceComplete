import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";
import TeacherModel from "../models/TeacherModel.js"

// const {Datatypes}=Sequelize;

const Attendance=db.define('attendance',{
    facultyId:DataTypes.STRING,
    TeacherName:DataTypes.STRING,
    Status:DataTypes.STRING,
    RoomNo:DataTypes.STRING,
    Course:DataTypes.STRING,
    Time:DataTypes.TIME, 
    Date:DataTypes.DATEONLY,
},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

}); 
// Establishing the foreign key relationship
// Attendance.belongsTo(TeacherModel, { foreignKey: 'FacultyID' });

export default Attendance;

(async()=>{
    await db.sync();
})();
