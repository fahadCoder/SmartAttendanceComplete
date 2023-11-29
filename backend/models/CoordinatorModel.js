// // import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";

// const {Datatypes}=Sequelize;

const Coordinator=db.define('Coordinator',{
    facultyId:DataTypes.STRING,
    Name:DataTypes.STRING,
    DOB:DataTypes.DATE,
    Email:DataTypes.STRING,
    Password:DataTypes.STRING,
    Gender:DataTypes.STRING,
    Address:DataTypes.STRING,
},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

});

export default Coordinator;

(async()=>{
    await db.sync();
})();


