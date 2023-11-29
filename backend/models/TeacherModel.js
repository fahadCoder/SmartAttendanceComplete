// // import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";

// const {Datatypes}=Sequelize;

const Teacher=db.define('teacher',{
    facultyId:DataTypes.STRING,
    // FacultyID: {
    //     type: DataTypes.STRING,
    //     primaryKey: true // Assuming FacultyID is the primary key in the Admin model
    //   },
    Name:DataTypes.STRING,
    DOB:DataTypes.DATEONLY,
    Email:DataTypes.STRING,
    Password:DataTypes.STRING, 
    UpdatePassword:DataTypes.INTEGER,
    Gender:DataTypes.STRING,
    Address:DataTypes.STRING,
    Country:DataTypes.STRING,
    Experience:DataTypes.INTEGER,

},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

});

export default Teacher;

(async()=>{
    await db.sync();
})();


