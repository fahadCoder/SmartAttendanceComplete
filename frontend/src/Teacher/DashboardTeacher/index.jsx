// import { Box, Button, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import StatBox from "../../components/StatBox";
// import CameraAccess from "../CameraAccess";
// import MarkAttendanceButton from "../MarkAttendanceButton";

// const DashboardTeacher = () => {

   

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box m="20px">
    
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
//            <StatBox
//             title="Presents"
//             subtitle="0"
   
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
//             title="Absents"
//             subtitle="0"
           
            
//           />
//         </Box>
//         {/* <Box>
//           <CameraAccess/>
//         </Box> */}
//         <Box>
//           <MarkAttendanceButton/>
//         </Box>



//       </Box>
//     </Box>

//   );
// };

// export default DashboardTeacher;
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import MarkAttendanceButton from "../MarkAttendanceButton";
import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";

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

const DashboardTeacher = () => {

   

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


// for image attendance checking
const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a form data object to send the image to the server
      const formData = new FormData();
      formData.append('image', image);

      // Send the image to the server for recognition
      const response = await axios.post('http://localhost:5000/Teacherdashboard', formData);

      console.log(response.data); // process the response data as required
    } catch (error) {
      console.log(error.message);
    }
  }


const [OpenRegistration,SetOpenRegistration]=useState(false);
const OpenRegistrationForm=()=>{
  SetOpenRegistration(true);
}
const RefistrationFormClose=()=>{
  SetOpenRegistration(false);
}



  return (
    <>
    
    <Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEACHER DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
              }}
              onClick={OpenRegistrationForm}
            >
              {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
              Mark Attendance
            </Button>
      </div>
        </Box>
      
      </Box>

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
            title="Presents"
            subtitle="0"
   
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
            title="Absents"
            subtitle="0"
           
            
          />
        </Box>
      


        <Box>
      
          {/* this code is used for select image from directory and send to model API */}
        {/* <div>
      <h1>Image Recognition</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleImageUpload} />
        <button type="submit">Recognize</button>
      </form>
    </div> */}
     
        
        </Box>

        {/* <button onClick={handleCameraOpen}>Open Camera</button>
      <CameraModal showCamera={showCamera} handleClose={handleCameraClose} /> */}
          
      </Box>
    
    </Box>
    
      <div>
      <BootstrapDialog
          onClose={RefistrationFormClose}
          aria-labelledby="customized-dialog-title"
          open={OpenRegistration}
          maxWidth="auto"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={RefistrationFormClose}>
           Mark Attendnace
          </BootstrapDialogTitle>
          <DialogContent dividers   >
       
          <MarkAttendanceButton/>

          
          </DialogContent>
        
        </BootstrapDialog>
      </div>
      </>

  );
};

export default DashboardTeacher;
