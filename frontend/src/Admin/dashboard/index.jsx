// import { Box, Button, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import StatBox from "../../components/StatBox";
// import PersonIcon from '@mui/icons-material/Person';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import GroupsIcon from '@mui/icons-material/Groups';
// import {useState, useEffect } from 'react';
// import axios from "axios";

// import { getTeacherTotal } from "../../services/Api";

// const Dashboard = () => { 


//   // const[teacher,setTeacher]=useState([]);
//   // // const [rows, setRows] = useState([]);

//   // useEffect(()=>{
//   //   getTeacherTotal();
//   //   // console.log(total);

//   // },[]);

//   // const getUsers=async()=>{
//   //   const response=await axios.get("http://localhost:5000/dashboard")
//   //   setTeacher(response.data);

//   //   console.log("total Teachers",teacher);
//   // }

//   // const getTeacherTotal = async () => {
//   //   try {
//   //     const response = await axios.get('http://localhost:5000/dashboard');
//   //     return response.data.total;
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
  
//   // const total = await getTeacherTotal();
//   // console.log(total);

//   // const displayTotal = async () => {
//   //   try {
//   //     const total = await getTeacherTotal();
//   //     console.log("sdkjfsdk",total);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // }
//   // ---------------------------------------------
//   const [totalTeachers, setTotalTeachers] = useState(0);
//   // displayTotal();
//   fetch('http://localhost:5000/dashboard')
//   .then(response => response.json())
//   .then(data => {
//     setTotalTeachers(data.total);
//     console.log(`Total number of teachers: ${data.total}`);
//     // const totalTeacher=data.total;

//   })
//   .catch(error => console.error(error));

// //  ---------------------------------------------- // 



// const [adminCount, setAdminCount] = useState(0);
// const [coordinatorCount, setCoordinatorCount] = useState(0);
// const [supervisorCount, setSupervisorCount] = useState(0);
// const [teacherCount, setTeacherCount] = useState(0);


// useEffect(() => {
//   fetch('http://localhost:5000/dashboard/TotalAdmins')
//     .then(response => response.json())
//     .then(data => {
//       setAdminCount(data.adminCount);
//       setCoordinatorCount(data.coordinatorCount);
//       setSupervisorCount(data.supervisorCount);
//       setTeacherCount(data.teacherCount);

//     })
//     .catch(error => console.log(error.message));
// }, []);







//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box m="20px">
//       {/* HEADER */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

//         <Box>
//           <Button
//             sx={{
//               backgroundColor: colors.blueAccent[700],
//               color: colors.grey[100],
//               fontSize: "14px",
//               fontWeight: "bold",
//               padding: "10px 20px",
//             }}
//           >
//             {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
//            Start Train Model
//           </Button>
//         </Box>
//       </Box>

//       {/* GRID & CHARTS */}
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >
//         {/* ROW 1 */}
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={adminCount}
//             subtitle="Admins"
//             // progress="0.75"
//             // increase="+14%"
//             // icon={
//             //   <EmailIcon
//             //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//             //   />
//             // }
//             icon={
//               <PersonIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={coordinatorCount}
//             subtitle="Coardinator"
//             // progress="0.50"
//             // increase="+21%"
//             // icon={
//             //   <PointOfSaleIcon
//             //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//             //   />
//             // }
//             icon={
//               <SupervisorAccountIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={supervisorCount}
//             subtitle="Supervisors"
//             // progress="0.30"
//             // increase="+5%"
//             icon={
//               <SupervisorAccountIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={teacherCount}
//             subtitle="Teachers"
//             // progress="0.80"
//             // increase="+43%"
//             icon={
//               <GroupsIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>

//       </Box>
//     </Box>

//   );
// };

// export default Dashboard;
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from '@mui/icons-material/Groups';
import {useState, useEffect } from 'react';
import axios from "axios";
import TrainModelButton from "../TrainModel/index.jsx";
import DatasetCollection from "../DatasetCollection";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
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
const Dashboard = () => { 


  // ---------------------------------------------
  const [totalTeachers, setTotalTeachers] = useState(0);
  // displayTotal();
  fetch('http://localhost:5000/dashboard')
  .then(response => response.json())
  .then(data => {
    setTotalTeachers(data.total);
    console.log(`Total number of teachers: ${data.total}`);
    // const totalTeacher=data.total;

  })
  .catch(error => console.error(error));

//  ---------------------------------------------- // 



const [adminCount, setAdminCount] = useState(0);
const [coordinatorCount, setCoordinatorCount] = useState(0);
const [supervisorCount, setSupervisorCount] = useState(0);
const [teacherCount, setTeacherCount] = useState(0);


useEffect(() => {
  fetch('http://localhost:5000/dashboard/TotalAdmins')
    .then(response => response.json())
    .then(data => {
      setAdminCount(data.adminCount);
      setCoordinatorCount(data.coordinatorCount);
      setSupervisorCount(data.supervisorCount);
      setTeacherCount(data.teacherCount);
      console.log("Admin Count is ",adminCount);

    })
    .catch(error => console.log(error.message));
}, []);




const [OpenDialog,SetOpenDialog]=useState(false);
const OpenDialogForm=()=>{
  SetOpenDialog(true);
}
const DialogFormClose=()=>{
  SetOpenDialog(false);
}


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
        </Box>
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
        <TrainModelButton/>

            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                margin:'5px'
              }}
              onClick={OpenDialogForm}
            >
              {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
              Collect Dataset
            </Button>

      {/* </div> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={adminCount}
            subtitle="Admins"
            // progress="0.75"
            // increase="+14%"
            // icon={
            //   <EmailIcon
            //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            //   />
            // }
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={coordinatorCount}
            subtitle="Coardinator"
            // progress="0.50"
            // increase="+21%"
            // icon={
            //   <PointOfSaleIcon
            //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            //   />
            // }
            icon={
              <SupervisorAccountIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={supervisorCount}
            subtitle="Supervisors"
            // progress="0.30"
            // increase="+5%"
            icon={
              <SupervisorAccountIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={teacherCount}
            subtitle="Teachers"
            // progress="0.80"
            // increase="+43%"
            icon={
              <GroupsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

      </Box>
    </Box>
    <div>
     <BootstrapDialog
     onClose={DialogFormClose}
     aria-labelledby="customized-dialog-title"
     open={OpenDialog}
     maxWidth="auto"
   >
     <BootstrapDialogTitle id="customized-dialog-title" onClose={DialogFormClose}>
      DatasetCollection Form
     </BootstrapDialogTitle>
     <DialogContent dividers   >
  
     <DatasetCollection/>

     
     </DialogContent>
   
   </BootstrapDialog>
 </div>
 </>

  );
};

export default Dashboard;
