import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
////////////
import {  Button } from "@mui/material";
import * as yup from "yup";
import {useState} from 'react';
import { useSelector } from "react-redux";
import UpdateTeam from "../UpdateTeam";
import NewUserForm from "../form";
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from "axios";
import {deleteAdmin} from "../../services/Api"
import swal from "sweetalert"
import { addLogdata } from "../../services/Api";

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';




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






const Team = () => 
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
    Changes: "Delete Admin Team Member",
    Designation: Designation,
    Date: formattedDate

  })



  const isData=useSelector((state)=>state.dashboard.permissions)



  const [open, setOpen] = React.useState(false);

// For member update form
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

// for Add new mwmber form
const [OpenRegistration,SetOpenRegistration]=useState(false);
const OpenRegistrationForm=()=>{
  SetOpenRegistration(true);
}
const RefistrationFormClose=()=>{
  SetOpenRegistration(false);
}
const [rows,setRows]=useState([])
const[Admin,setAdmin]=useState([]);

  /////////////////
  useEffect(()=>{
    getUsers();
  },[]);
  const getUsers=async()=>{
    const response=await axios.get("http://localhost:5000/dashboard/team")
    setAdmin(response.data);
    // console.log("hi data added");
  
    console.log(response.data);
  }

   // Call the getData function every time deleteData is called
   useEffect(() => {
    getUsers();
  }, [deleteAdmin]);
  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteAdmin = (adminId) => {
    deleteAdmin(adminId);
    getUsers();
    addLogdata(logData).then((res) => {
      console.log("Delete Admin Team Member")
    }).catch((err) => {
      console.log("Error ", err)
    })
    swal({
      title:" Deleted Successful",
      icon:"success"
    })
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    // setSelectedRow(params.row);
    setSelectedRow(params.row); 

  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "ID", flex: 1, },
    {
      field: "FacultyID",
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
      field: "Email",
      headerName: "Email",
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
      field: "Role",
      headerName: "Role",
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
          disabled={(isData?.UpdateTeam)?false:true}

          >
          <EditIcon/>
          
           
          </IconButton>
           <IconButton variant="contained" color="primary"
                     disabled={(isData?.DeleteTeam)?false:true}
 
              onClick={(event)=>{
                handleDeleteAdmin(cellValues.row.id);

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
      <Header title="Users" subtitle="Managing the  Users" />
      <Box style={{ display: "flex" }}>
          <Button
           onClick={OpenRegistrationForm}
           disabled={(isData?.AddTeam)?false:true}

            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", 
              marginLeft: "auto",
            }}
          >
           Add New Member
           
          </Button>
        </Box>
      <Box
        m="40px 0 0 0"
        height="61vh"
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
         rows={Admin}
          columns={columns}
          rowGetter={(i) => rows[i]}
          onRowClick={handleRowClick}

          />
      </Box>
    </Box>
    <div>
     
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="auto"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update Team Member
        </BootstrapDialogTitle>
        <DialogContent dividers>
     
     <UpdateTeam rowData={selectedRow}/>
        
        </DialogContent>
      
      </BootstrapDialog>

{/* Add New User */}
           
      <BootstrapDialog
        onClose={RefistrationFormClose}
        aria-labelledby="customized-dialog-title"
        open={OpenRegistration}
        maxWidth="auto"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={RefistrationFormClose}>
         Create New User
        </BootstrapDialogTitle>
        <DialogContent dividers   >
     
     <NewUserForm/>
        
        </DialogContent>
      
      </BootstrapDialog>

  
    


    </div>


    </>
  );
  
};

export default Team;
