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
import swal from 'sweetalert2';

////////////
import {  Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NewPermissions from "../UpdatePermission"
import InputLabel from '@mui/material/InputLabel';
import { useEffect } from 'react';
import axios from "axios";

import{
  FormControl,

} from '@mui/material';
// ////////


import{
  FormLabel,
  FormControlLabel,
 

} from '@mui/material';


import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';



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

const Roles = () => {
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

  const[Permissions,setPermissions]=useState([]);
  const [rows, setRows] = useState([]);
  
  useEffect(()=>{
    getLogs();
  },[]);
  
  const getLogs=async()=>{
    const response=await axios.get("http://localhost:5000/dashboard/roles")
    setPermissions(response.data);
    console.log("Permissions : ",Permissions);

  
    console.log(response.data);
  } 
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  }
  const handleDeleteAdmin = (adminId) => {
    // deleteAdmin(adminId);
    // getUsers();
    // addLogdata(logData).then((res) => {
    //   console.log("Delete Admin Team Member")
    // }).catch((err) => {
    //   console.log("Error ", err)
    // })
    swal({
      title:" Not Activated Yet",
      icon:"error"
    })
  };
   
  const columns = [
    // { field: "id", headerName: "id", flex: 1 },

    { field: "facultyId", headerName: "FacultyID", flex: 0.5 },


    {
      field: "ViewTeam",
      headerName: "ViewTeam",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "UpdateTeam",
      headerName: "UpdateTeam",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "DeleteTeam",
      headerName: "DeleteTeam",
      // type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "AddTeam",
      headerName: "AddTeam",
      flex: 1,
    },
    {
      field: "ViewTeacher",
      headerName: "ViewTeacher",
      flex: 1,
    },
    {
      field: "UpdateTeacher",
      headerName: "UpdateTeacher",
      flex: 1,
    },
    {
      field: "DeleteTeacher",
      headerName: "DeleteTeacher",
      flex: 1,
    },
    {
      field: "AddTeacher",
      headerName: "AddTeacher",
      flex: 1,
    },
    {
      field: "ViewTimetable",
      headerName: "ViewTimetable",
      flex: 1,
    },
    {
      field: "UpdateTimetable",
      headerName: "UpdateTimetable",
      flex: 1,
    },
    {
      field: "DeleteTimetable",
      headerName: "DeleteTimetable",
      flex: 1,
    },
    {
      field: "AddTimetable",
      headerName: "AddTimetable",
      flex: 1,
    },
    {
      field: "ViewAttendance",
      headerName: "ViewAttendance",
      flex: 1,
    },
    {
      field: "UpdateAttendance",
      headerName: "UpdateAttendance",
      flex: 1,
    },
    {
      field: "DeleteAttendance",
      headerName: "DeleteAttendance",
      flex: 1,
    },
    {
      field: "AddAttendance",
      headerName: "AddAttendance",
      flex: 1,
    },
    {
      field: "ViewLogs",
      headerName: "ViewLogs",
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

          >
          <EditIcon/>
          
          </IconButton>
           <IconButton variant="contained" color="primary"
 
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
      <Header
        title="Team Permissions"
        subtitle="List of Permissions"
      />
      <Box  m="20px">
      {/* <Controls.Button variant="contained" onClick={()=>setOpenpopup(true)}  >
        Add Mannual
        </Controls.Button> */}
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
    {/* <div style={{ height: 400, width: '100%', overflow: 'auto' }}> */}

        <DataGrid
          // rows={row}
          // columns={columns}
          // components={{ Toolbar: GridToolbar }}
          columns={columns}
          rows={Permissions}
          rowGetter={(i) => rows[i]}
          onRowClick={handleRowClick}
          components={{ Toolbar: GridToolbar }}
          
        />
        {/* </div> */}
                {/* <DataGrid checkboxSelection rows={row} columns={columns} components={{ Toolbar: GridToolbar }}/> */}

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
         Update Permissions
       </BootstrapDialogTitle>
       <DialogContent dividers>
    
          <NewPermissions  rowData={selectedRow}/>
             </DialogContent>
           
           </BootstrapDialog>
   </div>
    </>
  );
};

export default Roles;







const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

// import { Box } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import Popup from "../PopupForm";  
// import React, { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import CloseIcon from '@mui/icons-material/Close';
// import useMediaQuery from "@mui/material/useMediaQuery";

// ////////////
// import {  Button, TextField } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import UpdatePermissions from "../UpdatePermissions"
// import InputLabel from '@mui/material/InputLabel';

// import{
//   FormControl,

// } from '@mui/material';
// // ////////


// import{
//   FormLabel,
//   FormControlLabel,
 

// } from '@mui/material';


// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';



// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// function BootstrapDialogTitle(props) {





  
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// const Roles = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [openPopup,setOpenpopup]=useState(false);


//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };


  
   
//   const columns = [
//     // { field: "id", headerName: "id", flex: 1 },

//     { field: "FacultyID", headerName: "FacultyID", flex: 1 },


//     {
//       field: "Team",
//       headerName: "Team",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "Teacher",
//       headerName: "Teacher",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "Attendance",
//       headerName: "Attendance",
//       // type: "text",
//       headerAlign: "left",
//       align: "left",
//       flex: 1,
//     },
//     {
//       field: "TimeTable",
//       headerName: "TimeTable",
//       flex: 1,
//     },
//     {
//       field: "Logs",
//       headerName: "Logs",
//       flex: 1,
//     },
 
//     {
//       field: "Action",
//       headerName: "Action",
//       flex: 1,
//       renderCell:(cellValues)=>{
//         return(
//           <div>
//           <IconButton variant="contained" color="primary" 
//           onClick={handleClickOpen}
//           >
//           <EditIcon/>
          
           
//           </IconButton>
//            <IconButton variant="contained" color="primary" 
//           //  onClick={(event)=>{
//           //   // handleClickOpen();
//           //  }}
//            >
//            <DeleteForeverIcon/>
//            </IconButton>

          
//            </div>
//         )
//       }
      
//     },
//   ];

//   return (
//     <>
//     <Box m="20px">
//       <Header
//         title="Team Permissions"
//         subtitle="List of Permissions"
//       />
//       <Box  m="20px">
//       {/* <Controls.Button variant="contained" onClick={()=>setOpenpopup(true)}  >
//         Add Mannual
//         </Controls.Button> */}
//       </Box>

//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={row}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
          
//         />
//                 {/* <DataGrid checkboxSelection rows={row} columns={columns} components={{ Toolbar: GridToolbar }}/> */}

//       </Box>
//     </Box>

//     <div>
     
//      <BootstrapDialog
//        onClose={handleClose}
//        aria-labelledby="customized-dialog-title"
//        open={open}
//        maxWidth="auto"
//      >
//        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
//          Update Permissions
//        </BootstrapDialogTitle>
//        <DialogContent dividers>
    
//           <UpdatePermissions/>
//              </DialogContent>
           
//            </BootstrapDialog>
//    </div>
//     </>
//   );
// };

// export default Roles;


// function createData(id,FacultyID, Team,Teacher, Attendance,TimeTable,Logs) {
//   return { id,FacultyID, Team,Teacher, Attendance,TimeTable ,Logs};
// }

// const row = [
//   // createData(1,'Read,Update,Delete','Read','Update,Add','Add,View'),
//   createData(2,'A332','Read Update Delete View','Add Update Delete View','Add Update Delete View','Add Update Delete View','View'),
//   createData(3,'B232',' ','Add Update Delete View','Add Update Delete View','Add Update Delete View',' '),
//   createData(4,'A452','','Add Update Delete View','','Add Update Delete View',' '),


// ]



// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
// };
