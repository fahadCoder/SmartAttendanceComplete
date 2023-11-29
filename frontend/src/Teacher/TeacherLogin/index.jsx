import React ,{ useEffect } from 'react';
import {Box, Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {createContext} from "react";
// import { useHistory } from 'react-router-dom';
import { Login } from "../../services/Api";
import Cookies from 'universal-cookie';
import { Teacherloggingin } from '../../Admin/store/slice';
import face from './face-id.png';

const defaulValues1 = {
  FacultyId: '',
  Password: '',
}
  const Teacher={
    FacultyId:'T12',
    Password:'teacher',
    teacher:true
  }

const Role=createContext();

   


const TeacherLogin=(props)=>{
  const dispatch=useDispatch()



  const isData=useSelector((state)=>state.dashboard.isTeacher.teacher)
  console.log("from ligin",isData)
  
  const cookies = new Cookies();

// Login from mysql

const navigate=useNavigate();

const isTeacher={
  teacher:true
}
const[user,setUser]=useState({
  FacultyID:"",Password:""
});

let name,value;
const LoginHandle=(e)=>{
name=e.target.name;
value=e.target.value;
setUser({... user,[name]:value});}

const LoginAction = async () =>{
  // console.log("login success");

 
  // navigate('/Teacherdashboard');
  // alert("login success");
  const isUser =   await Login(user);

  // Check if user object exists
  if (isUser) {
    // Store user credentials in local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('ifteacher', JSON.stringify(isTeacher));

    cookies.set('user', user);
    console.log("cookies", cookies.get('user')); // Pacman
 dispatch(Teacherloggingin())
    // alert('Login successful');
    // Navigate to the Teacherdashboard page
    // navigate('/Teacherdashboard');

    // Show a success alert
  }
 

 }

    useEffect(() => {
      localStorage.clear()
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);


    

    const paperStyle={padding :20,height:'70vh',width:400,margin:'auto'}
    // const avatarStyle={backgroundColor:'#1bbd7e'}


  
   

   



    
    return(
        <div style={{}}>
        <Grid sx={{mt:'60px'}}>
            <Paper elevation={10} style={paperStyle} >
                <Grid align='center' sx={{ mt: '12px'}}>
                     {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                      */}
                 <Box display="flex" justifyContent="center" alignItems="center"  >
                <img
                  alt="profile-user"
                  width="30px"
                  height="30px"
                  src={face}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                {/* <h1
                style={{color: 'Black', marginLeft: '10px'}}
                > Smart Attendance</h1> */}
              </Box>

                    <h2>Teacher LogIn</h2>
                </Grid>
                <TextField sx={{ mt: '20px'}}  name="FacultyID" label='TeacherID' placeholder='Enter TeacherID' fullWidth required 
                value={user.FacultyID}
                onChange={LoginHandle}
                
                />
                <TextField sx={{ mt: '20px'}}  name="Password" label='Password' placeholder='Enter password' type='password' fullWidth required
                value={user.Password}
                onChange={LoginHandle}
                />
        
                  
                <Button sx={{ mt: '25px'}} type='submit' color='primary' variant="contained" onClick={LoginAction} fullWidth>Login</Button>
                <Typography sx={{ mt: '15px'}} >
                     <Link href="ForgotPassword" >
                        Forgot password ?
                </Link>
                </Typography>
                
            </Paper>
        </Grid>

        
        </div>
    )
}

export default TeacherLogin;
export {Role};