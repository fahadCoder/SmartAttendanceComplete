
import { object,string,date } from 'yup';
import { parse, isDate } from "date-fns";

const today = new Date();

export const TeacherSchema=object({
  facultyId:string().required("Please enter your Facultyid").min(3).max(6),
    Name:string().required("Please enter your Name").min(4).max(20),
    Password:string().required("Please enter your Password").min(7).max(20),
    DOB:date().required("Please select DOB"),
    Email:string().email().required("Please enter your Email"),
    Gender: string().oneOf(['Male', 'Female'], 'Invalid gender selection').required('Gender is required'),
    Address:string().min(5).max(50).required("Please enter your Address").min(10).max(30),
    

})

export const UpdateUserSchema=object({
    FacultyID:string().required("Please enter Facultyid").min(2).max(6),
    Name:string().required("Please enter your Name").min(4).max(20),
    Password:string().required("Please enter your Password").min(7).max(20),
    // DOB:date().required("Please select DOB"),
    DOB:date().transform(parseDateString).max(today),
    Email:string().email().required("Please enter your Email"),
    // Role:string().oneOf(['Admin', 'Coordinator','Supervisor']).required("Please select user Role"),
    Role:string().oneOf(['Coordinator','Supervisor']).required("Please select user Role"),
    Address:string().min(5).max(50).required("Please enter your Address").min(10).max(30),
    Gender:string().oneOf(['Male', 'Female']).required("Please user Role"),


})
export const AttendanceSchema=object({
  facultyId:string().required("Please enter Facultyid").min(3).max(6),
    TeacherName:string().required("Please enter Teacher Name").min(4).max(20),
    Status:string().oneOf(['P', 'A']).required("Please select Attendance Status"),
    RoomNo:string().required("Please Enter RoomNo"),
    Course:string().required("Enter course name"),
    Time:string().required("Select time"),
    // Date:date().required("Select date").max(today),
    Date:date().transform(parseDateString).max(today)



})
function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
  }

  export const TimetableSchema=object({
    FacultyID:string().required("Please enter Facultyid").min(3).max(6),
    RoomNo:string().required("Please enter RoomNo").min(3).max(6),
    Batch:string().required("Please enter BatchNo").min(4).max(20),
    Course:string().required("Enter course name").min(4).max(20),
    TeacherName:string().required("please enter Teacher Name").min(4).max(20),
    StartTime:string().required("Select StartTime"),
    EndTime:string().required("Select EndTime"),
    Day:string().oneOf(['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday']).required("Please select Day"),





})