import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {getTeacherAttendanceById} from "../../services/Api"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const TeacherAttendance = () => {
 // Retrieve the user object from local storage
// Retrieve the user object from local storage
var userString = localStorage.getItem('user');
var user = JSON.parse(userString);
console.log("useer ::",user);

// Access the properties of the user object
var facultyId = user.FacultyID;
console.log("useer id is ::",facultyId);

var password = user.Password;

console.log(facultyId); // Output: "1015"
console.log(password); // Output: "112233"
    const [attendanceList, setAttendanceData] = useState([]);
    // const teacherId = localStorage.getItem('FacultyID');
    const [rows,setRows]=useState([])
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await getTeacherAttendanceById(facultyId);
        setAttendanceData(data);
        
      };
      fetchData();
    }, []);
// ----------------------------------------------------------------------
//     const [attendanceData, setAttendanceData] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     const data = await getTeacherAttendanceById(teacherId);
//     setAttendanceData(Object.values(data));
//   };
//   fetchData();
// }, [teacherId]);
// --------------------------------------------------------------------------
// const [attendanceList, setAttendanceList] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/dashboard/Attendance:${teacherId}`);
//       setAttendanceList(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   fetchData();
// }, []);
 
 

console.log("teacher Attendance",attendanceList);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "facultyId",
      headerName: "FacultyId",
      type: "text",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "TeacherName",
      headerName: "Teacher Name",
      type: "text",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Course",
      headerName: "Course",
      type: "text",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    
    {
      field: "Status",
      headerName: "Status",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
    // {
    //   field: "RoomNo",
    //   headerName: "RoomNo",
    //   type: "text",
    //   flex: 1,
    // },
    {
      field: "Time",
      headerName: "Time",
      type: "time",
      flex: 1,
    },
    {
      field: "Date",
      type: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Teacher Attendance"
        subtitle="List of Attendance"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          // rows={attendanceData}
         
          // getRowId={(row) => row.id} // replace "FacultyId" with your unique identifier field
          columns={columns}
          rows={attendanceList}
          rowGetter={(i) => rows[i]}
          components={{ Toolbar: GridToolbar }}
          
        />
      </Box>
    </Box>
  );
};

export default TeacherAttendance;
