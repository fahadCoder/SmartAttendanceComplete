import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Popup from "../PopupForm"; 
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";
// import UpdateAttendance from "../UpdateAttendanceForm";
import {  Button, TextField } from "@mui/material";
import { Formik } from "formik";
import AttendanceForm from "../UpdateAttendanceForm";
import MannualAttendance from "../MannualAttendance";
import { useEffect } from 'react';
import axios from "axios";
import {deleteAttendance} from "../../services/Api"
import { useSelector } from "react-redux";
import { addLogdata } from "../../services/Api";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const Attendance = () => {

  const currentuser = JSON.parse(localStorage.getItem('user'));
  const { FacultyID } = currentuser;
  const Designation = JSON.parse(localStorage.getItem('Designation'));
  console.log("Designation is :: ",Designation);
  
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const formattedTime = currentDate.toISOString();
 
  const [logData, setLogData] = useState({
    FacultyID: FacultyID || "",
    Time: formattedTime,
    Changes: "Delete Attendance",
    Designation: Designation,
    Date: formattedDate

  })



// get row data for update


const isData=useSelector((state)=>state.dashboard.permissions)

const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  }

  // /////

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openPopup,setOpenpopup]=useState(false);


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DeleteButton=(id)=>{
    // const id = params.row.;
    console.log( id);
    deleteAttendance(id);
    getUsers();
    addLogdata(logData).then((res) => {
      console.log("Mannual Attendance Log Updated")
    }).catch((err) => {
      console.log("Error ", err)
    })
    // navigate('/dashboard/Attendance');
    getUsers();
  
  }
  // for Add Mannual Attendance 
const [OpenMannualAttendance,SetOpenMannualAttendance]=useState(false);
const OpenMannualAttendanceForm=()=>{
  SetOpenMannualAttendance(true);
}
const RefistrationFormClose=()=>{
  SetOpenMannualAttendance(false);
}

  // get data from database and set in a datagrid
const[attendance,setAttendance]=useState([]);
const [rows, setRows] = useState([]);

useEffect(()=>{
  getUsers();
},[]);

const getUsers=async()=>{
  const response=await axios.get("http://localhost:5000/dashboard/Attendance")
  setAttendance(response.data);
  // console.log("hi data added");

  console.log(response.data);
} 
   
  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "facultyId",
      headerName: "FacultyId",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "TeacherName",
      headerName: "Teacher Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Status",
      headerName: "Status",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "RoomNo",
      headerName: "RoomNo",
      flex: 1,
    },
    {
      field: "Course",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "Time",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell:(cellValues)=>{
        return(
          <div>
          <IconButton variant="contained" color="primary" 
          disabled={(isData?.UpdateAttendance)?false:true }
          onClick={handleClickOpen}
          >
          <EditIcon/>
          
           
          </IconButton>
           <IconButton variant="contained" color="primary"
            disabled={(isData?.DeleteAttendance)?false:true } 
              onClick={(event)=>{
              DeleteButton(cellValues.row.id);
            }}
           >
           <DeleteForeverIcon/>
           </IconButton>

          
           </div>
        )
      }
      
    },
  ];

  return (
    <>
    <Box m="20px">
      <Header
        title="Attendance"
        subtitle="List of Attendance"
      />
       <Box style={{ display: "flex" }}>
          <Button
             disabled={(isData?.AddAttendance)?false:true}
           onClick={OpenMannualAttendanceForm}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", 
              marginLeft: "auto",
            }}
          >
           Add Mannual Attedance
           
          </Button>
        </Box>
      <Box  m="20px">
     
      </Box>

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
          // rows={mockDataContacts}
          columns={columns}
          rows={attendance}
          rowGetter={(i) => rows[i]}
          onRowClick={handleRowClick}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
    <Popup>
          openPopup={openPopup}
          setOpenpopup={setOpenpopup}
    </Popup>


    {/* dialog from here */}
    <div>
    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="auto"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update Attendance
        </BootstrapDialogTitle>
        <DialogContent dividers>


        <AttendanceForm rowData={selectedRow} />
        
        </DialogContent>
      
      </BootstrapDialog>


      <BootstrapDialog
        onClose={RefistrationFormClose}
        aria-labelledby="customized-dialog-title"
        open={OpenMannualAttendance}
        maxWidth="auto"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={RefistrationFormClose}>
          {/* Update Team Member */}
        </BootstrapDialogTitle>
        <DialogContent dividers   >
     
     <MannualAttendance/>
        
        </DialogContent>
      
      </BootstrapDialog>
    </div>

    </>
  );
};

export default Attendance;
