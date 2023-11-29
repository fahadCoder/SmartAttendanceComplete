// import React, { useRef, useState } from 'react';

// function CameraAccess() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [stream, setStream] = useState(null);

//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(mediaStream);
//       videoRef.current.srcObject = mediaStream;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const takePicture = () => {
//     const context = canvasRef.current.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, 640, 480);
//   };

//   const stopCamera = () => {
//     stream.getTracks().forEach((track) => {
//       track.stop();
//     });
//     setStream(null);
//   };

//   return (
//     <div>
//       <button onClick={startCamera}>Start camera</button>
//       <button onClick={takePicture}>Take picture</button>
//       <button onClick={stopCamera}>Stop camera</button>
//       <video ref={videoRef} autoPlay={true} />
//       <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
//     </div>
//   );
// }

// export default CameraAccess;

// // ----------------------------------------------------------
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const CameraAccess = () => {
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);

  const handleCameraOpen = () => {
    setShowCamera(true);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleTakePicture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // do something with the image
  };

  return (
    <div>
      {!showCamera && (
        <button onClick={handleCameraOpen}>Open Camera</button>
      )}

      {showCamera && (
        <div>
          <Webcam audio={false} ref={webcamRef} />

          <button onClick={handleTakePicture}>Take Picture</button>
          <button onClick={handleCameraClose}>Close Camera</button>
        </div>
      )}
    </div>
  );
};

export default CameraAccess;
