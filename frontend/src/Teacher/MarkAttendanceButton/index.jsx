// import {Button,Box,useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import {useState} from 'react';
// import { useEffect } from 'react'; 
// import axios from "axios";
// import moment from 'moment';
// import React, {  useRef } from "react";
// import Webcam from "react-webcam";
// import swal from "sweetalert"

// const MarkAttendanceButton = () => {

//   var userString = localStorage.getItem('user');
// var user = JSON.parse(userString);
// console.log("useer ::",user);

// // Access the properties of the user object
// var facultyId = user.FacultyID;
// console.log("mark attendance button ::",facultyId);

// var password = user.Password;

// console.log(facultyId); // Output: "1015"


//     const [timetableEntries, setTimetableEntries] = useState([]);

//     useEffect(() => {
//       const fetchTimetable = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/Teacherdashboard/markattendance/${facultyId}`);
//           setTimetableEntries(response.data);
//           console.log("Start Time ",timetableEntries)
//         } catch (error) {
//           console.log(error.message);
//         }
//       };
  
//       fetchTimetable();
  
//       // // Call the function every second
//       // const intervalId = setInterval(fetchTimetable, 1000);
  
//       // // Cleanup function to clear the interval
//       // return () => clearInterval(intervalId);
//     }, []);
  
//     const isEntryClickable = entry => {
//       const startTime = moment(entry.Starttime, 'hh:mm A');
//       const endTime = startTime.clone().add(10, 'minutes');
//       const currentTime = moment();
//       return currentTime.isBetween(startTime, endTime) && currentTime.isBefore(endTime);
//     };



//     // -----------------------------Camera Code-------------------

//       const [showCamera, setShowCamera] = useState(false);
//       const [loading, setLoading] = useState(false);

//       const webcamRef = useRef(null);
    
//       const handleCameraClose = () => {
//         setShowCamera(false);
//       };


//     // -------------------------------------------------
//     const handleTakePicture = async (event) => {
//       event.preventDefault();
//       const imageSrc = webcamRef.current.getScreenshot();
//       setLoading(true); // show the loading circle
//       setShowCamera(false); // close the camera

//       // create a new FormData object
//       const formData = new FormData();
//       // append the image file to the formData object
//       formData.append('image', dataURItoBlob(imageSrc), 'image.jpg');
    
//       // Make an HTTP request to the server
// fetch('http://localhost:5000/Teacherdashboard', {
//   method: 'POST',
//   body: formData // Assuming you have the formData object containing the image data
// })
//   .then(response => response.json()) // Parse the response as JSON
//   .then(data => {
//     // Handle the response data
//     console.log(data); // Assuming the response data is in JSON format
//     // Do something with the data received from the server
//     if(data.msg=='Unknown Person')
//     {
//       swal({
//         title:data.msg + " Please Mark Your Attendance again or contact to Coordination Department",
//         icon:"error"
//       })
//     }
//     else
//     {
//       swal({
//         title: data.msg,
//         icon:"success"
//       })
//     }
    
//   })
//   .catch(error => {
//     // Handle any error that occurred during the request
//     console.log(error);
//     // Display an error message to the user or handle the error accordingly
//     swal({
//       title:data.msg,
//       icon:"error"
//     })
//   });

//     };
    
//     // helper function to convert a data URI to a Blob object
//     function dataURItoBlob(dataURI) {
//       // convert base64/URLEncoded data component to raw binary data held in a string
//       var byteString;
//       if (dataURI.split(',')[0].indexOf('base64') >= 0) {
//         byteString = atob(dataURI.split(',')[1]);
//       } else {
//         byteString = unescape(dataURI.split(',')[1]);
//       }
    
//       // separate out the mime component
//       var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
//       // write the bytes of the string to a typed array
//       var ia = new Uint8Array(byteString.length);
//       for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
    
//       // return a new Blob object
//       return new Blob([ia], { type: mimeString });
//     }
    
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//   return (
   

// <Box>
// {/* {loading && <div><h1>Loading...</h1></div>} */}
// {timetableEntries.length > 0 ? (
//         timetableEntries.map((entry, index) => (
//           <Button
//           key={index}
//             variant="contained"
//             disabled={!isEntryClickable(entry)}
//             onClick={() => setShowCamera(true)}
//           sx={{
//             backgroundColor: colors.blueAccent[700],
//             color: colors.grey[100],
//             fontSize: "14px",
//             fontWeight: "bold",
//             padding: "10px 20px",
//           }}
//           >
//           {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
//           Mark Attendance
//           </Button>


//         ))
//       ) : (
//           <Button
//           variant="contained"
//             disabled={true}
//           sx={{
//             backgroundColor: colors.blueAccent[700],
//             color: colors.grey[100],
//             fontSize: "14px",
//             fontWeight: "bold",
//             padding: "10px 20px",
//           }}
//           >
//           {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
//           No class have yet
//           </Button>
          
//       )}
//     <div>
//       {showCamera && (
//         <div>
//           <Webcam audio={false} ref={webcamRef} />

//           <button onClick={handleTakePicture}>Take Picture</button>
//           {/* <button onClick={handleCameraClose}>Close Camera</button> */}

//         </div>
//       )}
         
//     </div>
//     {/* <img src={`data:image/png;base64,${decodedString}`} alt="Decoded Image" /> */}
    
   

//     </Box>
    

   

//   );
// };

// export default MarkAttendanceButton;
import React, { useState, useEffect, useRef } from "react";
import { Button, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import moment from "moment";
import Webcam from "react-webcam";
import swal from "sweetalert";

const MarkAttendanceButton = () => {

    var userString = localStorage.getItem('user');
var user = JSON.parse(userString);
console.log("useer ::",user);

// Access the properties of the user object
var facultyId = user.FacultyID;
console.log("mark attendance button ::",facultyId);

  const [timetableEntries, setTimetableEntries] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMarkAttendance, setShowMarkAttendance] = useState(true);

  const webcamRef = useRef(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Teacherdashboard/markattendance/${facultyId}`
        );
        setTimetableEntries(response.data);
        console.log("Start Time ", timetableEntries);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTimetable();
  }, []);

  const handleTakePicture = async (event) => {
    event.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true); // show the loading circle
    setShowCamera(false); // close the camera
    setShowMarkAttendance(false); // hide the mark attendance button

    // create a new FormData object
    const formData = new FormData();
    // append the image file to the formData object
    formData.append("image", dataURItoBlob(imageSrc), "image.jpg");

    // Make an HTTP request to the server
    try {
      const response = await axios.post(
        "http://localhost:5000/Teacherdashboard",
        formData
      );
      console.log(response.data); // Assuming the response data is in JSON format
      // Do something with the data received from the server
      if (response.data.msg === "Unknown Person") {
        swal({
          title:response.data.msg,
          icon: "error",
        });
      } else {
        swal({
          title: response.data.msg,
          icon: "success",
        });
      }
    } catch (error) {
      // console.log(error);
      // swal({
      //   title: response.json(),
      //   text: "An error occurred while marking attendance.",
      //   icon: "error",
      // });
      if (error.response && error.response.status === 404) {
        const errorMessage = error.response.data.msg;
        swal({
          title: errorMessage,
          icon: "error",
        });
        console.error(errorMessage);
        // You can display the error message or update your component state accordingly
      } else {
        console.error('An error occurred:', error.message);
        swal({
          title: error.message,
          icon: "error",
        });
      }
    }

    setLoading(false); // hide the loading circle
    setShowMarkAttendance(true); // show the mark attendance button again
  };
      const isEntryClickable = entry => {
      const startTime = moment(entry.Starttime, 'hh:mm A');
      const endTime = startTime.clone().add(10, 'minutes');
      const currentTime = moment();
      return currentTime.isBetween(startTime, endTime) && currentTime.isBefore(endTime);
    };

  function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(dataURI.split(",")[1]);
    } else {
      byteString = unescape(dataURI.split(",")[1]);
    }

    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {timetableEntries.length > 0 ? (
        timetableEntries.map((entry, index) => (
          <div key={index}>
            {showMarkAttendance && (
              <Button
                variant="contained"
                disabled={!isEntryClickable(entry)}
                onClick={() => setShowCamera(true)}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Mark Attendance
              </Button>
            )}

            {showCamera && (
              <div>
                <Webcam audio={false} ref={webcamRef} />

                {/* <button onClick={handleTakePicture}>Take Picture</button> */}
                <Button
                    variant="contained"
                    onClick={handleTakePicture}
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                    }}
                  >
                    Mark Attendance
                  </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <Button
          variant="contained"
          disabled={true}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          No class yet
        </Button>
      )}
    </Box>
  );
};

export default MarkAttendanceButton;
