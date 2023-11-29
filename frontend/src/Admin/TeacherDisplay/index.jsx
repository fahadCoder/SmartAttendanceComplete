import { Box,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";

import Header from "../../components/Header";

import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import NewTeacher from "../NewTeacher";
import { useNavigate } from "react-router-dom";
import UpdateTeacherForm from "../UpdateTeacher";
import { useSelector } from "react-redux";

////////////
import {  Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import {useState} from 'react';
import axios from "axios";
import { addLogdata } from "../../services/Api";

// import deleteTeacher from "../../services/Api"
import {deleteTeacher} from "../../services/Api"
  
 


// /////////////////////////

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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};







const TeacherDisplay = () => 

{

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
    Changes: "Unroll Teacher",
    Designation: Designation,
    Date: formattedDate

  })


const isData=useSelector((state)=>state.dashboard.permissions)



  const navigate=useNavigate()

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  }
 
 
  // get data from mysql and display

  const[teacher,setTeacher]=useState([]);
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    getUsers();
  },[]);
  const getUsers=async()=>{
    const response=await axios.get("http://localhost:5000/dashboard/Teachers")
    setTeacher(response.data);
    // console.log("hi data added");
    

    console.log(response.data);
  }
  

  //  /////////////////////////////////
  // for Add new mwmber form
const [AddNewTeacher,SetAddNewTeacher]=useState(false);
const OpenRegistrationForm=()=>{
  SetAddNewTeacher(true);
}
const CloseRegistrationForm=()=>{
  SetAddNewTeacher(false);
}


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  /////////////////

const DeleteButton=(id)=>{
  // const id = params.row.;
  
  console.log( id);
  deleteTeacher(id);
  getUsers();
  addLogdata(logData).then((res) => {
    // console.log("Mannual Attendance Log Updated")
  }).catch((err) => {
    console.log("Error ", err)
  })
  navigate('/dashboard/Teachers');
  


}





  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "ID", flex: 1, },
    {
      field: "facultyId",
      headerName: "FacultyID",
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "Password",
      headerName: "Password",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "DOB",
      headerName: "DOB",
      type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
   
    {
      field: "Gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "Address",
      headerName: "Address",
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
          onClick={handleClickOpen}
          disabled={(isData?.UpdateTeacer)?false:true}

          >
          <EditIcon/>
          
           
          </IconButton>
           <IconButton variant="contained" color="primary" 
           onClick={(event)=>{
            DeleteButton(cellValues.row.facultyId);
           }}
           disabled={(isData?.DeleteTeacher)?false:true}

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
      <Header title="Teachers" subtitle="Managing the  Teachers" />
      <Box style={{ display: "flex" }}>
          <Button
           onClick={OpenRegistrationForm}

           disabled={(isData?.AddTeacher)?false:true}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", 
              marginLeft: "auto",
            }}
          >
           Add New Teacher
           
          </Button>
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
        }}
      >
        <DataGrid checkboxSelection 
        columns={columns}
        // rows={mockDataTeam} 
        rows={teacher}
        onRowClick={handleRowClick}
        rowGetter={(i) => rows[i]} />
      </Box>
    </Box>

    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="auto"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update Teacher details
        </BootstrapDialogTitle>
        <DialogContent dividers>
     
      <UpdateTeacherForm rowData={selectedRow}/>
        
        </DialogContent>
      
      </BootstrapDialog>



      <BootstrapDialog
    // style={{ width: '100%', height: '70%' }}
        onClose={CloseRegistrationForm}
        aria-labelledby="customized-dialog-title"
        open={AddNewTeacher}
        maxWidth="auto"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={CloseRegistrationForm}>
          Teacher Registration
        </BootstrapDialogTitle>
        <DialogContent dividers   >
     
     <NewTeacher/>
        
        </DialogContent>
      
      </BootstrapDialog>

    </div>


    </>
  );
  
};



export default TeacherDisplay;
