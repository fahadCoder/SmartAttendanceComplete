import React from 'react'
import Team from "../team";
import Timetable from "../TimeTable";
import Attendance from "../Attendance";
import Form from "../form";
import Timetableform from "../TimetableForm";
import ViewLogs from "../ViewLogs";
import FAQ from "../faq";
import MannualAttendance from "../MannualAttendance";
import TeacherDisplay from "../TeacherDisplay";
import NewTeacher from "../NewTeacher";
import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Roles from "../Roles";
import Login from "../Login";
import { useEffect,useState } from 'react';
import { GetPermissions } from '../../services/Api';
import { useDispatch, useSelector } from "react-redux";
import { Addpermissionsdata } from '../store/slice';
function AppRoutes() {
const dispatch=useDispatch()


// const getUser =  JSON.parse(localStorage.getItem("user"));
// const {FacultyID}=getUser


var Designation;


  function GetData(data) {
    Designation = data;
    alert(data);

    console.log("Designation is : ", Designation);
  }



  // useEffect(() => {

  //   const facultyId = 'SUP123'; // Replace with the actual faculty ID you want to query
  //   GetPermissions(FacultyID)
  //     .then(data => {
  //       console.log("ddd",data); // Permissions data for the faculty ID
  //       dispatch(Addpermissionsdata(data))
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);



  const stateData=useSelector((state)=>state.dashboard.permissions)
  console.log("kkk",stateData)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login alert={GetData} />} />

        <Route path="/dashboard/*" element={<Home />} >
        <Route path="team" element={<Team />} />
          <Route path="roles" element={<Roles />} />
           <Route path="logs" element={<ViewLogs />} />
          <Route path="form" element={<Form />} />
           <Route path="Attendance" element={<Attendance />} />
          <Route path="Timetableform" element={<Timetableform />} />
           <Route path="Timetable" element={<Timetable />} />
           <Route path="MannualAttendance" element={<MannualAttendance />} />
          <Route path="NewTeacher" element={<NewTeacher />} />
         <Route path="Teachers" element={<TeacherDisplay />} />
          {/* <Route path="Error" element={<FAQ />} /> */}
          <Route path="*" element={<div><FAQ /></div>} />


        </Route>



      </Routes>

    </>
  )
}
export default AppRoutes;
