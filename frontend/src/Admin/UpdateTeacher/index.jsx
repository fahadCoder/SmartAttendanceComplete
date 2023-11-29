import { Box,useTheme } from "@mui/material";
import React from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import {  Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
 
import {useState} from 'react';
import { useEffect } from 'react';
import {updateTeacher} from "../../services/Api"

import{FormControl} from '@mui/material';

import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import {TeacherSchema} from "../Validation"
import swal from "sweetalert"
import { addLogdata } from "../../services/Api";

const UpdateTeacher=({ rowData })=> { 

  const currentuser = JSON.parse(localStorage.getItem('user'));
  const { FacultyID } = currentuser;
  const Designation = JSON.parse(localStorage.getItem('Designation'));
  console.log("Designation is :: ",Designation);
  
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const formattedTime = currentDate.toISOString();
 
  const [logData, setLogData] = useState({
    FacultyID: FacultyID || "",
    Time: formattedTime,
    Changes: "Update Teacher Details",
    Designation: Designation,
    Date: formattedDate

  })




  const [formData, setFormData] = useState(rowData);
  
  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);


  console.log("hi i am update");

console.log("Teacher Update",formData);

  const [GenderValue,SetGenderValue]=useState('');
 
  const GenderChangeHandle=(event)=>{
    SetGenderValue(event.target.value);
  }
  const handleFormSubmit = (values) => {
    console.log(values);
  };

// const updateTeacherDetails=async()=>{
//   await updateTeacher (user,req.facultyId);
//      console.log("req id is : ",req.FacultyId);
//      navigate('/dashboard/Teachers')
//      alert("data successfully save");
//   }

// --------------------------------------------------------------------


const [Update, setUpdateData] = useState({
  FacultyId: formData.FacultyId,
  Name: formData.Name,
  DOB: formData.dob,
  Email: formData.Email,
  Gender: formData.Gender,
  Password:formData.Password,
  Address: formData.Address,
});

const handleChange2 = e => {
  setUpdateData({ ...Update, [e.target.name]: e.target.value });
};

const CallhandleSubmit = async e => {
  e.preventDefault();
  const teacherId = formData.id;// get the ID of the teacher you want to update
  console.log("ID for Update Teacher ; ",formData.id);
  try {
    const response = await fetch(`http://localhost:5000/dashboard/Teachers/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Update)
    });
    const data = await response.json();
    swal({
      title:data.msg,
      icon:"success"
    })
    addLogdata(logData).then((res) => {
      // console.log("Mannual Attendance Log Updated")
    }).catch((err) => {
      console.log("Error ", err)
    })
    console.log(data.msg); // success message from the server
  } catch (error) {
    swal({
      title:error.message,
      icon:"error"
    })
    console.error(error.message);
  }
};




// --------------------------------------------------------------------


  // const handleChange = (event) => {
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px">
    <Header title="Update Teacher" subtitle="Update Teacher details" />

    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={TeacherSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="FacultyId"
              onBlur={handleBlur}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.FacultyId}
              // value={formData.facultyId}
              defaultValue={formData.facultyId}
              name="facultyId"
              InputProps={{
                // readOnly: true
                disabled: true

              }}
              error={!!touched.facultyId && !!errors.facultyId}
              helperText={touched.facultyId && errors.facultyId}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.Name}
              // value={formData.Name}
              defaultValue={formData.Name}
              // initialValues
              name="Name"
              error={!!touched.Name && !!errors.Name}
              helperText={touched.Name && errors.Name}
              sx={{ gridColumn: "span 2" }}
            />
         
                <TextField
              fullWidth
              variant="filled"
              type="date"
              label="DOB"
              onBlur={handleBlur}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.DOB}
              defaultValue={formData.DOB}

              name="DOB"
              error={!!touched.DOB && !!errors.DOB}
              helperText={touched.DOB && errors.DOB}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.Email}
              defaultValue={formData.Email}

              name="Email"
              error={!!touched.Email && !!errors.Email}
              helperText={touched.Email && errors.Email}
              sx={{ gridColumn: "span 2" }}
            />
             <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.Password}
              defaultValue={formData.Password}

              name="Password"
              error={!!touched.Password && !!errors.Password}
              helperText={touched.Password && errors.Password}
              sx={{ gridColumn: "span 1" }}
            />
          
             <Box  sx={{ minWidth: 120 }}>
               
               <FormControl fullWidth>
               
                 <InputLabel sx={{ mt: 2 }} id="GenderSelectBox">Gender</InputLabel>
                 <Select
                   labelId="GenderSelectBox"
                   fullWidth
                   variant="filled"
                  //  value={GenderValue}
                  value={values.Gender}
                   defaultValue={formData.Gender}
                   label="Gender"
                   name="Gender"
                   onBlur={handleBlur}
                  //  onChange={GenderChangeHandle}
                  onChange={handleChange2}
                  onInput={handleChange}
                   error={!!touched.Gender && !!errors.Gender}
                   helperText={touched.Gender && errors.Gender}
                   // sx={{ gridColumn: "span 2" }}

                 >
                   <MenuItem value={"Male"}>Male</MenuItem>
                   <MenuItem value={"Female"}>FeMale</MenuItem>

                 </Select>
                 
               </FormControl>
               
             </Box>
               
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address"
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.Address}
              defaultValue={formData.Address}
              name="Address"
              error={!!touched.Address && !!errors.Address}
              helperText={touched.Address && errors.Address}
              sx={{ gridColumn: "span 2" }}
            />
          
             {/* <InputLabel id="demo-select-small">Role</InputLabel> */}
                
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" onClick={CallhandleSubmit} >
             Update
            </Button>
          </Box>
          
        </form>
      )}
    </Formik>
  </Box>

  )
}
export default UpdateTeacher;

const initialValues = {
  // if i allow this then all values are shown empty
  // FacultyId: "",
  // Name: "",
  // DOB: "",
  // Email: "",
  // Gender: "",
  // Password:"",
  // Address: "",

};