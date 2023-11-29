import React from 'react'
import { Routes, Route } from "react-router-dom";
import TeacherAttendance from "../TeacherAttendance";
import TimetableTeacher from "../TimetableTeacher";
import Home from "../TeacherHome";
import Login from "../TeacherLogin";
import OneTimePassword from "../Password/OneTimePassword";
import ForgotPassword from "../Password/ForgotPassword";
import VerifcationCode from "../Password/VerifcationCode";
import NewPassword from "../Password/NewPassword";
import { useSelector } from 'react-redux';
function TeacherRoutes() {

  const isTeacher = JSON.parse(localStorage.getItem("ifteacher"))
  console.log("iff",isTeacher)
  const teacherFound = isTeacher?.teacher
  console.log(teacherFound)
  const isData=useSelector((state)=>state.dashboard.isTeacher.teacher)
console.log("issss",isData)
  return (
    <>

      {
        (!teacherFound) ?
          <Routes>
            <Route path="/Teacher" element={<Login />} />
          </Routes>
          :
          <Routes>
            <Route path="/Teacher" element={<Login />} />
            <Route path="/Teacherdashboard/*" element={<Home />} >
            <Route path="TeacherAttendance" element={<TeacherAttendance />} />
              {/* <Route path="TeacherTimetable" element={<TeacherTimetable />}  /> */}
            <Route path="TimetableTeacher" element={<TimetableTeacher />} /></Route>
            <Route path="OneTimePassword" element={<OneTimePassword />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="VerifcationCode" element={<VerifcationCode />} />
            <Route path="NewPassword" element={<NewPassword />} />
            {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
          </Routes>

      }
    </>
  )
}
export default TeacherRoutes;
