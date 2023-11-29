// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploader = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleUpload = async () => {
//     if (selectedImage) {
//       const formData = new FormData();
//       formData.append('image', selectedImage);

//       try {
//         const fileType = selectedImage.type;
//         const config = {
//           headers: {
//             'Content-Type': fileType,
//           },
//         };

//         await axios.post('http://localhost:5000/dashboard/DatasetCollection', formData, config);
//         console.log('Image uploaded successfully!');
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default ImageUploader;


import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const DatasetCollection = () => {
  const [folderName, setFolderName] = useState('');
  const [showCameraButton, setShowCameraButton] = useState(true);
  const [showCaptureButton, setShowCaptureButton] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('image', blob, `image${Date.now()}.jpg`);
      formData.append('folderName', folderName);

      axios.post('http://localhost:5000/dashboard/DatasetCollection', formData)
        .then((response) => {
          console.log(response.data);
          // Handle success
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    }, 'image/jpeg');
  };

  const handleFileChange = (e) => {
    setFolderName(e.target.value);
  };

  const openCamera = () => {
    setShowCameraButton(false);
    setShowCaptureButton(true);

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const closeCamera = () => {
    setShowCaptureButton(false);

    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <input
        type="text"
        value={folderName}
        onChange={handleFileChange}
        readOnly={!showCameraButton}
      />
      {showCameraButton &&  <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                margin:'10px'
              }}
              onClick={openCamera}
            >
              {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
              Open Camera
            </Button>}
      <video ref={videoRef} autoPlay></video>
      {showCaptureButton &&  <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                margin:'10px'

              }}
              onClick={handleCapture}
            >
              {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
              Capture
            </Button>}
      {showCaptureButton &&  <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                margin:'10px'

              }}
              onClick={closeCamera}
            >
              {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
              Close Camera
            </Button>}
    </div>
  );
};

export default DatasetCollection;
