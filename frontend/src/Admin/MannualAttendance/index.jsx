
import * as React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { useState } from "react";
import{FormControl} from '@mui/material';
import { addManualAttendance } from "../../services/Api";
import {AttendanceSchema} from "../Validation";
import swal from 'sweetalert';
import { addLogdata } from "../../services/Api";

const defaulValues1 = {
  facultyId: '',
  TeacherName: '',
  Status:'',
  RoomNo: '',
  Course: '',
  Time: '', 
  Date: '',
  

}

const MannualAttendance = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
    Changes: "Marked Attendance Mannualy",
    Designation: Designation,
    Date: formattedDate

  })




  const handleFormSubmit = (values) => {
    console.log(values);
  };
 

  const [Status, SetStatus] = React.useState('Select Attendance Status');
  
  const [Mattendance, setMAttendance] = useState(defaulValues1);

  const addAttendanceDetails = async () =>{
    console.log("mm",Mattendance)
    if(Object.values(Mattendance).some(value => value === "")){
      
        swal({
          title:"Please fill the fields",
          icon:"error"
        })
      }

 else{   
  await addManualAttendance(Mattendance).then((res) => {
addLogdata(logData).then((res) => {
    // console.log("Mannual Attendance Log Updated")
  }).catch((err) => {
    console.log("Error ", err) 
  })
  })
  
   } 
  }

  const onValueChange3 = (e) => {
    // console.log(e.target.name, e.target.value);
    setMAttendance({ ...Mattendance, [e.target.name]: e.target.value });
 };

  const handleChangeStatus = (event) => {
    SetStatus(event.target.value);
  };


  return (
    <Box m="20px">
      <Header title="Mannual Attendance" subtitle="Mark Mannual Attendance" />

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
                label="facultyId"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange3}
                value={values.facultyId}
                name="facultyId"
                error={!!touched.facultyId && !!errors.facultyId}
                helperText={touched.facultyId && errors.facultyId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Teacher Name"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange3}
                value={values.TeacherName}
                name="TeacherName"
                error={!!touched.TeacherName && !!errors.TeacherName}
                helperText={touched.TeacherName && errors.TeacherName}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth>
                 
                 <InputLabel sx={{ mt: 2 }} id="StatusSelectBox">Status</InputLabel>
               <Select
                 labelId="StatusSelectBox"

                  label="Status"
                  fullWidth
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  name="Status"
                 
                  error={!!touched.Status && !!errors.Status}
                  helperText={touched.Status && errors.Status}
                  sx={{ gridColumn: "span 2" }}



                    // labelId="demo-select-small"
                    id="demo-select-small"
                    value={values.Status}
                    onChange={onValueChange3} 
                  >
                    <MenuItem value={values.Status}>
                      {/* <em>None</em> */}
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
                onInput={handleChange}
                onChange={onValueChange3}
                value={values.RoomNo}
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
                onInput={handleChange}
                onChange={onValueChange3}
                value={values.Course}
                name="Course"
                error={!!touched.Course && !!errors.Course}
                helperText={touched.Course && errors.Course}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="Time"
                error={!!touched.Time && !!errors.Time}
                helperText={touched.Time && errors.Time}
                sx={{ gridColumn: "span 2" }}
              /> */}
             
             <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Time"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange3}
                value={values.Time}
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
                name="Date"
                onBlur={handleBlur}
                onChange={onValueChange3}
                onInput={handleChange}
                value={values.Date}
                
                error={!!touched.Date && !!errors.Date}
                helperText={touched.Date && errors.Date}
                sx={{ gridColumn: "span 2" }}
              />
              



            
                  
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" onClick={()=> addAttendanceDetails()} >
                Add Manual Attendance
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

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

export default MannualAttendance;