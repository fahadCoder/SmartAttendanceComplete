import { Box, useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import {useState} from 'react';
import { useEffect } from 'react'; 
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getTeacherTimetableById} from "../../services/Api"

const TimetableTeacher = () => {

// ****************************8get data from database and set in a datagrid
const[teacher,setTeacher]=useState([]);
const [rows, setRows] = useState([]);
// Retrieve the user object from local storage
// Retrieve the user object from local storage
var userString = localStorage.getItem('user');
var user = JSON.parse(userString);
console.log("useer ::",user);

// Access the properties of the user object
var facultyId = user.FacultyID;
console.log("useer id is faculty id iss     dfsdc ::",facultyId);

var password = user.Password;

console.log(facultyId); // Output: "1015"
console.log(password); // Output: "112233"
    const [attendanceList, setAttendanceData] = useState([]);
    // const teacherId = localStorage.getItem('FacultyID');
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await getTeacherTimetableById(facultyId);
        setAttendanceData(data);
        console.log("Timetable client data is :: ",data);
        
      };
      fetchData();
    }, []);
    console.log("Timetable client data attendanceList :: ",attendanceList);

// useEffect(()=>{
//   getUsers();
// },[]);
// const getUsers=async()=>{
//   const response=await axios.get("http://localhost:5000/Teacherdashboard/TimetableTeacher")
//   setTeacher(response.data);
//   // console.log("hi data added");

//   console.log(response.data);
// }
// *********************deleteTimetable***********************
// const DeleteTimetable=(id)=>{
//   deleteTimetable(id);
//   navigate('/dashboard/Timetable');
// }

  // ---------------------------------------------
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "id" , flex: 1,},
    {
      field: "Students",
      headerName: "Students",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "ModuleID",
      headerName: "ModuleID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "CourseName",
      headerName: "CourseName",
      // type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Starttime",
      headerName: "Starttime",
      flex: 1,
    },
    {
      field: "Endtime",
      headerName: "Endtime",
      flex: 1,
    },
 
    // {
    //   field: "Monday",
    //   headerName: "Monday",
    //   flex: 1,
    // },
    // {
    //   field: "Tuesday",
    //   headerName: "Tuesday",
    //   flex: 1,
    // },
    // {
    //   field: "Wednesday",
    //   headerName: "Wednesday",
    //   flex: 1,
    // },
    // {
    //   field: "Thursday",
    //   headerName: "Thursday",
    //   flex: 1,
    // },
    // {
    //   field: "Friday",
    //   headerName: "Friday",
    //   flex: 1,
    // },
    // {
    //   field: "Saturday",
    //   headerName: "Saturday",
    //   flex: 1,
    // },
    // {
    //   field: "Sunday",
    //   headerName: "Sunday",
    //   flex: 1,
    // },
    {
      field: "TeacherName",
      headerName: "TeacherName",
      flex: 1,
    },
    {
      field: "TeacherId",
      headerName: "TeacherId",
      flex: 1,
    },
   
  ];

  return (
    <Box m="20px">
      <Header title="Time Table" subtitle="List of Time Tables" />
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
        }}
      >
        <DataGrid checkboxSelection
          columns={columns} 
          rows={attendanceList}
          rowGetter={(i) => rows[i]}
          // onRowClick={handleRowClick}
         components={{ Toolbar: GridToolbar }}/>
      </Box>
    </Box>
  );
};

export default TimetableTeacher;
