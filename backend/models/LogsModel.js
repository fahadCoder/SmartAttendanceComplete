// // import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";

// const {Datatypes}=Sequelize;

const Log=db.define('logs',{
    FacultyID:DataTypes.STRING,
    Time:DataTypes.TIME,
    Changes:DataTypes.STRING,
    Designation:DataTypes.STRING,
    Date:DataTypes.DATE,
    

},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

});

export default Log;

(async()=>{
    await db.sync();
})();