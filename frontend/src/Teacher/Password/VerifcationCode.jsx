import React ,{ useEffect } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {createContext} from "react";



const Role=createContext();


const VerifcationCode=(props)=>{
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);


    const[user,setUser]=useState({
        ForgotPassword:""
    });
    
    let name,value;
    const VerifcationCode=(e)=>{
    name=e.target.ForgotPassword;
    value=e.target.value;
    setUser({... user,[name]:value});}

    const paperStyle={padding :20,height:'50vh',width:400,margin:'auto'}
    const avatarStyle={backgroundColor:'#1bbd7e'}


  
   
    const navigate=useNavigate();

    const Click=()=>{

        navigate("/NewPassword");




    }
    return(
        <>
        <Grid sx={{mt:'60px'}}>
            <Paper elevation={10} style={paperStyle} >
                <Grid align='center' sx={{ mt: '12px'}}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Enter Verifcation Code</h2>
                </Grid>
                <TextField sx={{ mt: '20px'}} type="text" name="VerifcationCode" label='VerifcationCode' placeholder='Enter VerifcationCode' fullWidth required 
                value={user.VerifcationCode}
                onChange={VerifcationCode}
                
                />
               
                  
                <Button sx={{ mt: '25px'}} type='submit' color='primary' variant="contained" onClick={Click} fullWidth>Submit</Button>
               
                
            </Paper>
        </Grid>

        
        </>
    )
}

export default VerifcationCode
// export {Role};