import React, { useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createContext } from "react";
import { Box } from "@mui/material";
import { AdminLogin } from "../../services/Api";
import Cookies from 'universal-cookie';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import face from './face.png';

const Role = createContext();


const Login = (props) => {

  const cookies = new Cookies();

 const navigate=useNavigate()
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  const [user, setUser] = useState({
    FacultyID: "", Password: ""
  });

  let name, value;
  const LoginHandle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

  }

  const paperStyle = { padding: 20, height: '70vh', width: 400, margin: 'auto' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  // const navigate=useNavigate();






  const [showPassword, setShowPassword] = useState(false);

const handleTogglePasswordVisibility = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};

  const LoginAction = async () => {
    // Call your login function that returns the user object
    const isUser = await AdminLogin(user);

    // Check if user object exists
    if (isUser) {
      // Store user credentials in local storage
      localStorage.setItem('user', JSON.stringify(user));
      cookies.set('user', user);
      console.log("cookies", cookies.get('user')); // Pacman

      // alert('Login successful');
      // Navigate to the Teacherdashboard page
      navigate('/dashboard');

      // Show a success alert
    }
  }

  return (
    <>
      <Grid sx={{ mt: '60px' }}>
        <Paper elevation={10} style={paperStyle} >
          <Grid align='center' sx={{ mt: '12px' }}>
            {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="Smart Attendance"
                width="70px"
                height="70px"
                src={face}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    alt="Smart Attendance"
                    width="100px"
                    height="100px"
                    src='./face.png'
                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                  />
              </div> */}
            <h2>Smart Attendance</h2>
          </Grid>
          <TextField sx={{ mt: '20px' }} name="FacultyID" label='FacultyID' placeholder='Enter FacultyID' fullWidth required
            value={user.FacultyID}
            onChange={LoginHandle}

          />
          <TextField
                  sx={{ mt: '20px' }}
                  name="Password"
                  label="Password"
                  placeholder="Enter password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  value={user.Password}
                  onChange={LoginHandle}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}/>
          {/* <TextField sx={{ mt: '20px' }} name="Password" label='Password' placeholder='Enter password' type='password' fullWidth required
            value={user.Password}
            onChange={LoginHandle}
          /> */}


          <Button sx={{ mt: '25px' }} type='submit' color='primary' variant="contained" onClick={LoginAction} fullWidth>Login</Button>
          {/* <Typography sx={{ mt: '15px'}} >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography> */}

        </Paper>
      </Grid>

      {/* ///////////////////////// */}



    </>
  )
}

export default Login
export { Role };