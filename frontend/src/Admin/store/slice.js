import { createSlice } from "@reduxjs/toolkit";

const getUser = () => JSON.parse(localStorage.getItem("user"));
const getTeacher = () => JSON.parse(localStorage.getItem("ifteacher"));


const DashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        auth: getUser()
            ? getUser()
            : {
                userId: "",
                type: "",
            },
      isTeacher:getTeacher()
      ?getTeacher()
            :{
              teacher:null
            },

        permissions: {
            facultyId: "",

            ViewTeam: "",
            UpdateTeam: "",
            DeleteTeam: "",
            AddTeam: "",

            ViewTeacher: "",
            UpdateTeacer: "",
            DeleteTeacher: "", 
            AddTeacher: "",

            ViewTimetable: "",
            UpdateTimetable: "",
            DeleteTimetable: "",
            AddTimetable: "",

            ViewAttendance: "",
            UpdateAttendance: "",
            DeleteAttendance: "",
            AddAttendance: "",

            ViewLogs: "",
        }


    },
    reducers: {
        Addpermissionsdata(state, action) {
            state.permissions = {
              ...state.permissions,
              ...action.payload,
            };
          },
          Teacherloggingin(state, action) {
            state.isTeacher.teacher=true
          },
          Teacherloggingout(state, action) {
            console.log("hello")
            state.isTeacher.teacher=null
            console.log(state.isTeacher)
          },
          Clearpermissiondata(state, action) {
            state.permissions = {
              facultyId: "",
              ViewTeam: "",
              UpdateTeam: "",
              DeleteTeam: "",
              AddTeam: "",
              ViewTeacher: "",
              UpdateTeacer: "",
              DeleteTeacher: "",
              AddTeacher: "",
              ViewTimetable: "",
              UpdateTimetable: "",
              DeleteTimetable: "",
              AddTimetable: "",
              ViewAttendance: "",
              UpdateAttendance: "",
              DeleteAttendance: "",
              AddAttendance: "",
              ViewLogs: "",
            };
          },
          Addadminpermissiondata(state, action) {
            console.log("act",action)
            state.permissions = {
              facultyId: action?.payload.ID,
              ViewTeam: "true",
              UpdateTeam: "true",
              DeleteTeam: "true",
              AddTeam: "true",
              ViewTeacher: "true",
              UpdateTeacer: "true",
              DeleteTeacher: "true",
              AddTeacher: "true",
              ViewTimetable: "true",
              UpdateTimetable: "true",
              DeleteTimetable: "true",
              AddTimetable: "true",
              ViewAttendance: "true",
              UpdateAttendance: "true",
              DeleteAttendance: "true",
              AddAttendance: "true",
              ViewLogs: "true",
            };
          },
    },
});


export { DashboardSlice };
export const {
    Addpermissionsdata,
    Clearpermissiondata,
    Addadminpermissiondata,
    Teacherloggingin,
    Teacherloggingout
} = DashboardSlice.actions;

