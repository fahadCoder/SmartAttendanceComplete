// // import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";

// const {Datatypes}=Sequelize;

const Admin=db.define('Admin',{
    FacultyID:DataTypes.STRING,
    Name:DataTypes.STRING,
    DOB:DataTypes.DATEONLY,
    Email:DataTypes.STRING,
    Password:DataTypes.STRING,
    Role:DataTypes.STRING,
    Gender:DataTypes.STRING,
    Address:DataTypes.STRING,
},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

});

export default Admin;

(async()=>{
    await db.sync();
})();


