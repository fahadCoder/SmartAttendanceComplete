// import React ,{ useEffect }from 'react';
// import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {createContext} from "react";



// const Role=createContext();


// const OneTimePassword=(props)=>{

//     useEffect(() => {
//         document.body.style.overflow = "hidden";
//         return () => {
//           document.body.style.overflow = "auto";
//         };
//       }, []);
      

//     const[user,setUser]=useState({
//         FacultyID:"",Password:""
//     });
    
//     let name,value;
//     const NewPasswordHandle=(e)=>{
//     name=e.target.name;
//     value=e.target.value;
//     setUser({... user,[name]:value});}

//     const paperStyle={padding :20,height:'50vh',width:400,margin:'auto'}
//     const avatarStyle={backgroundColor:'#1bbd7e'}


  
   
//     const navigate=useNavigate();

//     const Click=()=>{
// alert("New Password saved Successfully")
//         navigate("/Teacherdashboard");




//     }
//     return(
//         <>
//         <Grid sx={{mt:'60px'}}>
//             <Paper elevation={10} style={paperStyle} >
//                 <Grid align='center' sx={{ mt: '12px'}}>
//                      <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
//                     <h2>Set new Password</h2>
//                 </Grid>
//                 <TextField sx={{ mt: '20px'}} type="password" name="NewPassword" label='NewPassword' placeholder='Enter NewPassword' fullWidth required 
//                 value={user.NewPassword}
//                 onChange={NewPasswordHandle}
                
//                 />
               
                  
//                 <Button sx={{ mt: '25px'}} type='submit' color='primary' variant="contained" onClick={Click} fullWidth>Submit</Button>
               
                
//             </Paper>
//         </Grid>

        
//         </>
//     )
// }

// export default OneTimePassword
// // export {Role};
// import React ,{ useEffect }from 'react';
// import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {createContext} from "react";



// const Role=createContext();


// const OneTimePassword=(props)=>{

//     useEffect(() => {
//         document.body.style.overflow = "hidden";
//         return () => {
//           document.body.style.overflow = "auto";
//         };
//       }, []);
      

//     const[user,setUser]=useState({
//         FacultyID:"",Password:""
//     });
    
//     let name,value;
//     const NewPasswordHandle=(e)=>{
//     name=e.target.name;
//     value=e.target.value;
//     setUser({... user,[name]:value});}

//     const paperStyle={padding :20,height:'50vh',width:400,margin:'auto'}
//     const avatarStyle={backgroundColor:'#1bbd7e'}


  
   
//     const navigate=useNavigate();

//     const Click=()=>{
// alert("New Password saved Successfully")
//         navigate("/Teacherdashboard");




//     }
//     return(
//         <>
//         <Grid sx={{mt:'60px'}}>
//             <Paper elevation={10} style={paperStyle} >
//                 <Grid align='center' sx={{ mt: '12px'}}>
//                      <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
//                     <h2>Set new Password</h2>
//                 </Grid>
//                 <TextField sx={{ mt: '20px'}} type="password" name="NewPassword" label='NewPassword' placeholder='Enter NewPassword' fullWidth required 
//                 value={user.NewPassword}
//                 onChange={NewPasswordHandle}
                
//                 />
               
                  
//                 <Button sx={{ mt: '25px'}} type='submit' color='primary' variant="contained" onClick={Click} fullWidth>Submit</Button>
               
                
//             </Paper>
//         </Grid>

        
//         </>
//     )
// }

// export default OneTimePassword
// // export {Role};
import React ,{ useEffect }from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {createContext} from "react";

import { ChangePasswordOneTime } from "../../services/Api";


const Role=createContext();


const OneTimePassword=(props)=>{

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);
      
    
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// const facultyId = urlParams.get('facultyId');
var facultyId = localStorage.getItem("FacultyID");

console.log("Faculty ID: ", facultyId);
const [user, setUser] = useState({
    FacultyID: facultyId,
    Password: ""
  });

  const NewPasswordHandle = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

    const paperStyle={padding :20,height:'50vh',width:400,margin:'auto'}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const navigate=useNavigate();

    const Click=()=>{
alert("New Password saved Successfully")
        navigate("/Teacherdashboard");

    }
    // ----------------------------------
  
      const LoginAction = async () =>{
        // console.log("login success");
      
        await ChangePasswordOneTime(user);
        // navigate('/Teacherdashboard');
        // alert("login success");
       
      
       }
    return(
        <>
        <Grid sx={{mt:'60px'}}>
            <Paper elevation={10} style={paperStyle} >
                <Grid align='center' sx={{ mt: '12px'}}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Set new Password</h2>
                </Grid>
                <TextField sx={{ mt: '20px'}} type="password" name="Password" label='NewPassword' placeholder='Enter NewPassword' fullWidth required 
                value={user.Password}
                onChange={NewPasswordHandle}
                
                />
               
                  
                <Button sx={{ mt: '25px'}} type='submit' color='primary' variant="contained" onClick={LoginAction} fullWidth>Submit</Button>
               
                
            </Paper>
        </Grid>

        
        </>
    )
}

export default OneTimePassword
export {Role};