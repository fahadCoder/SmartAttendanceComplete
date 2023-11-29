import { Box, useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UpdateTimetable from "../UpdateTimetable";
import {  Button, TextField } from "@mui/material";
import TimetableForm from "../TimetableForm";
import {useState} from 'react';
import { useEffect } from 'react'; 
import axios from "axios";
import {deleteTimetable} from "../../services/Api"
import Dropzone from 'react-dropzone';
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert"

// import ReadTimetab from XLSXReader;
import XLSXReader from '../ReadTimetable';

// import { makeStyles } from '@mui/styles';
// import { makeStyles } from '@mui/styles';
// import { makeStyles } from '@mui/material/styles';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
// ----------------------------------------------------
// 
// ------------------------------------
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

  
const Timetable = () => {
  
  const isData=useSelector((state)=>state.dashboard.permissions)


  // /---------------------------------*********Finalize***************-----------------------------------------
  
  const navigate=useNavigate()






  // ------------------------------------Above---------------------------------------

//  get row data for update
const [selectedRow, setSelectedRow] = useState(null);
const handleRowClick = (params) => {
  setSelectedRow(params.row);
}

// ///////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; 


    // for Add new timetable form
const [AddNewTimetable,SetAddNewTimetable]=React.useState(false);
const OpenTimetableForm=()=>{
  SetAddNewTimetable(true);
}
const CloseTimetableForm=()=>{
  SetAddNewTimetable(false);
}


// ****************************8get data from database and set in a datagrid
const[teacher,setTeacher]=useState([]);
// const [rows, setRows] = useState([]);

useEffect(()=>{
  getUsers();
},[]);
const getUsers=async()=>{
  try{
    const response=await axios.get("http://localhost:5000/dashboard/Timetable")
    setTeacher(response.data);
    console.log(response.data);
   
  }catch(e){
    swal({
      title:e,
      icon:"error"
    })
 alert("error is",e)
  }
  
  // console.log("hi data added");

}
const DeleteTimetable=(id)=>{
  deleteTimetable(id);
  navigate('/dashboard/Timetable');
}
const deleteTimetableall = async () => {
  try {
    const response = await axios.delete('http://localhost:5000/dashboard/Timetable');
    console.log(response.data); // Handle the response data
    swal({
      title:response.data.msg,
      icon:"success"
    })
    getUsers();
  } catch (error) {
    swal({
      title:error,
      icon:"error"
    })
    console.error(error);
  }
};

 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "id" , flex: 1,},
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
 
    {
      field: "Monday",
      headerName: "Monday",
      flex: 1,
    },
    {
      field: "Tuesday",
      headerName: "Tuesday",
      flex: 1,
    },
    {
      field: "Wednesday",
      headerName: "Wednesday",
      flex: 1,
    },
    {
      field: "Thursday",
      headerName: "Thursday",
      flex: 1,
    },
    {
      field: "Friday",
      headerName: "Friday",
      flex: 1,
    },
    {
      field: "Saturday",
      headerName: "Saturday",
      flex: 1,
    },
    {
      field: "Sunday",
      headerName: "Sunday",
      flex: 1,
    },
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
    // {
    //   field: "Action",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell:(cellValues)=>{
    //     return(
    //       <div>
    //       <IconButton variant="contained" color="primary" 
    //       onClick={handleClickOpen}
    //       disabled={(isData?.UpdateTimetable)?false:true}

    //       >
    //       <EditIcon/>
          
           
    //       </IconButton>
    //        <IconButton variant="contained" color="primary" 
    //        disabled={(isData?.UpdateTimetable)?false:true}

    //        onClick={(event)=>{
    //         DeleteTimetable(cellValues.row.id);
    //        }}
    //        >
    //        <DeleteForeverIcon/>
    //        </IconButton>

          
    //        </div>
    //     )
    //   }
      
    // },
  ];

  return (
    <>
    <Box m="20px">
      <Header title="Time Table" subtitle="List of Time Tables" />
      <Box>


{/* <div>
  <h1>Upload Timetable</h1>
  <form onSubmit={handleSubmit}>
    <input type="file" name="timetable" onChange={handleFileChange} />
    <button type="submit"  disabled={(isData?.AddTimetable)?false:true}>Upload</button>
  </form>
</div> */}
<XLSXReader/>




      {/* ----------------------------------------------------- */}
        </Box>
        <Box style={{ display: "flex" }}>
          {/* <Button
           onClick={OpenTimetableForm}
           disabled={(isData?.AddTimetable)?false:true}

            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", 
              marginLeft: "auto",
            }}
          >
           New Timetable
           
          </Button> */}
           <Button
           onClick={deleteTimetableall}

            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", 
              marginLeft: "auto",
            }}
          >
           DeleteTimetable
           
          </Button>
      {/* <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop an Excel file here, or click to select a file</p>
          </div>
        )}
      </Dropzone> */}
      {/* {file && (
        <div>
          <p>{file.name}</p>
          <button onClick={uploadFile}>Upload</button>
        </div>
      )} */}
    
    
        </Box>
      <Box

      
        m="10px 0 0 0"
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
          rows={teacher}
          rowGetter={(i) => rows[i]}
          onRowClick={handleRowClick}
         components={{ Toolbar: GridToolbar }}/>
   
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
                  {/* Update Timetable */}
                </BootstrapDialogTitle>
                <DialogContent dividers   >
            
                <UpdateTimetable rowData={selectedRow}/>
                
                </DialogContent>
      
            </BootstrapDialog>

            <BootstrapDialog
                  onClose={CloseTimetableForm}
                  aria-labelledby="customized-dialog-title"
                  open={AddNewTimetable}
                  maxWidth="auto"
                >
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={CloseTimetableForm}>
                    {/* New timetable */}
                  </BootstrapDialogTitle>
                  <DialogContent dividers   >
              
              <TimetableForm/>
                  
                  </DialogContent>
      
      </BootstrapDialog>

    </div>

</>
    

  );
};

function createData(id, RoomNo, Batch,Course,StartTime,EndTime,Day,Teacher) {
  return { id, RoomNo, Batch,Course,StartTime,EndTime,Day,Teacher };
}

const rows = [
  createData(1,'F-201','fall-11','TOA','11:00','13:00','Friday','Usama Imtiaz'),
  createData(2,'F-202','fall-12','COAL','13:00','15:00','Monday','Shahbaz Hassan'),
  createData(3,'F-203','fall-13','Compiler','15:00','16:00',' Tuesday','Adil-ur-Rehman'),
  createData(4,'F-204','fall-14','PDC','8:00','9:00','Wednesday','Osama Ahmed'),
  createData(5,'F-205','fall-15','DLD','9:00','10:00','Thursday','Usama Imtiaz'),
  createData(6,'F-206','fall-16','COAL','1:00','3:00','Saturday','Shahbaz Hassan'),

  createData(7,'A-201','fall-11','Digital Marketing','11:00','13:00','Friday','Atif Riaz'),
  createData(8,'A-203','fall-13','Numarical','15:00','16:00',' Tuesday','Iqbal Khan'),
  createData(9,'A-204','fall-14','Differential','8:00','9:00','Wednesday',' Shahzad Ahmed'),
  createData(10,'A-205','fall-15','Database','9:00','10:00','Thursday','Qazi Shujah'),
  createData(11,'A-206','fall-16','Computer Networks','1:00','3:00','Saturday','Sharjeel Ahmed'),

  createData(12,'B-201','fall-11','TOA','11:00','13:00','Friday','Usama Imtiaz'),
  createData(13,'B-202','fall-12','COAL','13:00','15:00','Monday','Shahbaz Hassan'),
  createData(14,'B-203','fall-13','Compiler','15:00','16:00',' Tuesday','Adil-ur-Rehman'),
  createData(15,'B-204','fall-14','PDC','8:00','9:00','Wednesday','Osama Ahmed'),
  createData(16,'B-205','fall-15','DLD','9:00','10:00','Thursday','Usama Imtiaz'),
  createData(17,'B-206','fall-16','COAL','1:00','3:00','Saturday','Shahbaz Hassan'),
  
  createData(18,'B-201','fall-11','TOA','11:00','13:00','Friday','Usama Imtiaz'),
  createData(19,'B-202','fall-12','COAL','13:00','15:00','Monday','Shahbaz Hassan'),
  createData(20,'B-203','fall-13','Compiler','15:00','16:00',' Tuesday','Adil-ur-Rehman'),
  createData(21,'B-204','fall-14','PDC','8:00','9:00','Wednesday','Osama Ahmed'),
  createData(22,'B-205','fall-15','DLD','9:00','10:00','Thursday','Usama Imtiaz'),
  createData(23,'B-206','fall-16','COAL','1:00','3:00','Saturday','Shahbaz Hassan'),

  createData(24,'B-201','fall-11','TOA','11:00','13:00','Friday','Usama Imtiaz'),
  createData(25,'B-202','fall-12','COAL','13:00','15:00','Monday','Shahbaz Hassan'),
  createData(26,'B-203','fall-13','Compiler','15:00','16:00',' Tuesday','Adil-ur-Rehman'),
  createData(27,'B-204','fall-14','PDC','8:00','9:00','Wednesday','Osama Ahmed'),
  createData(28,'B-205','fall-15','DLD','9:00','10:00','Thursday','Usama Imtiaz'),
  createData(29,'B-206','fall-16','COAL','1:00','3:00','Saturday','Shahbaz Hassan'),

  createData(30,'B-201','fall-11','TOA','11:00','13:00','Friday','Usama Imtiaz'),
  createData(31,'B-202','fall-12','COAL','13:00','15:00','Monday','Shahbaz Hassan'),
  createData(32,'B-203','fall-13','Compiler','15:00','16:00',' Tuesday','Adil-ur-Rehman'),
  createData(33,'B-204','fall-14','PDC','8:00','9:00','Wednesday','Osama Ahmed'),
  createData(34,'B-205','fall-15','DLD','9:00','10:00','Thursday','Usama Imtiaz'),
  createData(35,'B-206','fall-16','COAL','1:00','3:00','Saturday','Shahbaz Hassan'),
];




export default Timetable;
// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

