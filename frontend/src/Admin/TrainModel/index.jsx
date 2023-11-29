import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import swal from 'sweetalert2';

const TrainModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleTrainModel = async () => {
    setIsLoading(true); 
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/dashboard/w');
      const responseData = response.data;
      setMessage(responseData.message);
      swal({
        title:responseData.message,
        icon:"success"
      })
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during model training.');
      swal({
        // title:responseData.message,
        title:"responseData.message",

        icon:"Error"
      })
    }

    setIsLoading(false);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Button
      disabled={isLoading}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              
            }}
            onClick={handleTrainModel}

          >
            {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
          {/* Colllect dataset */}
         
        {isLoading ? 'Training...' : 'Train Model'}
        </Button>
      {/* </button> */}
      {/* <p>{message}</p> */}
      
    </>
  );
};

export default TrainModel;
