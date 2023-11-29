import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const ExcelModel = db.define('TimetableTeacher', {
  Students: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ModuleID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  CourseName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Startdate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  Enddate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  Starttime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  Endtime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  Monday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Tuesday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Wednesday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Thursday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Friday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Saturday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Sunday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  TeacherName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  TeacherId: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Exclude createdAt and updatedAt columns
});

export default ExcelModel;
