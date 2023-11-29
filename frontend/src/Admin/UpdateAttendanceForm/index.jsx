import { Box } from "@mui/material";

import Header from "../../components/Header";
 
import React, { useState } from 'react';

import useMediaQuery from "@mui/material/useMediaQuery";

import {  Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import {AttendanceSchema} from "../Validation";

import{FormControl} from '@mui/material';
import { useEffect } from 'react';
import swal from "sweetalert"
import { addLogdata } from "../../services/Api";

function UpdateAttendance ({ rowData }) {

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
    Changes: "Update Attendance",
    Designation: Designation,
    Date: formattedDate

  })




  const [formData, setFormData] = useState(rowData);
  
  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);
  console.log("formData",formData);

  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  

  const [Status, SetStatus] = React.useState('Select Attendance Status');
  
  const handleChangeStatus = (event) => {
    SetStatus(event.target.value);
  };
  const [Update, setUpdateData] = useState({
    FacultyId: formData.FacultyID,
    Name:formData.Name,
    DOB: formData.DOB,
    Email: formData.Email,
    Role: formData.Role,
    Gender: formData.Gender,
    Password:formData.Password,
    Address: formData.Address,
  });
  const handleChange2 = e => {
    setUpdateData({ ...Update, [e.target.name]: e.target.value });
  };
  const CallhandleSubmit = async e => {
    e.preventDefault();
    // const teacherId = formData.id;// get the ID of the teacher you want to update
    const teacherId = formData.id;// get the ID of the teacher you want to update

    try {
      const response = await fetch(`http://localhost:5000/dashboard/Attendance/${teacherId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(Update)
      });
      const data = await response.json();
      console.log("ID for Update Teacher ; ",teacherId);
      swal({
        title:data.msg,
        icon:"success"
      })
      addLogdata(logData).then((res) => {
        console.log("Mannual Attendance Log Updated")
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

  return (
    <Box m="20px">
    <Header title=" Attendance" subtitle="Update Attendance" />

    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={AttendanceSchema}
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
              label="FacultyID"
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.facultyID}
              defaultValue={formData.facultyId}
              name="FacultyID"
              error={!!touched.FacultyID && !!errors.FacultyID}
              helperText={touched.FacultyID && errors.FacultyID}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Teacher Name"
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.TeacherName}
              defaultValue={formData.TeacherName}
              name="TeacherName"
              error={!!touched.TeacherName && !!errors.TeacherName}
              helperText={touched.TeacherName && errors.TeacherName}
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl fullWidth>
               
               <InputLabel id="StatusSelectBox">Status</InputLabel>
             <Select
               labelId="StatusSelectBox"

                label="Status"
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                name='Status'
               
                error={!!touched.Status && !!errors.Status}
                helperText={touched.Status && errors.Status}
                sx={{ gridColumn: "span 2" }}
                  id="demo-select-small"
                  // value={Status}
                  value={values.Status}
                  defaultValue={formData.Status}
                  // onChange={handleChangeStatus}
                  onChange={handleChange2}
                   onInput={handleChange}
                >
                  <MenuItem value="">
                  </MenuItem>
                  <MenuItem value={'P'}>P</MenuItem>
                  <MenuItem value={'A'}>A</MenuItem>
                 

                </Select>
                </FormControl>
           
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="RoomNo"
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.RoomNo}
              defaultValue={formData.RoomNo}
              name="RoomNo"
              error={!!touched.RoomNo && !!errors.RoomNo}
              helperText={touched.RoomNo && errors.RoomNo}
              sx={{ gridColumn: "span 1" }}
            />
               <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Course"
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.Course}
              defaultValue={formData.Course}
              name="Course"
              error={!!touched.Course && !!errors.Course}
              helperText={touched.Course && errors.Course}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="time"
              label="Time"
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.Time}
              defaultValue={formData.Time}
              name="Time"
              error={!!touched.Time && !!errors.Time}
              helperText={touched.Time && errors.Time}
              sx={{ gridColumn: "span 2" }}
            />
           
              

               <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Date"
              onBlur={handleBlur}
              // onChange={handleChange}
              onChange={handleChange2}
              onInput={handleChange}
              value={values.Date}
              defaultValue={formData.Date}
              name="Date"
              error={!!touched.Date && !!errors.Date}
              helperText={touched.Date && errors.Date}
              sx={{ gridColumn: "span 2" }}
            />



          
                
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" onClick={CallhandleSubmit}>
              Update
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
   
   
  )
}

export default UpdateAttendance;
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};
