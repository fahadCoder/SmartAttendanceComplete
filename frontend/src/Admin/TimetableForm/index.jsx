
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState } from "react";
import{FormControl} from '@mui/material';
import React from 'react';
import { addTable } from "../../services/Api";
import {TimetableSchema} from "../Validation"
import swal from "sweetalert";
import { addLogdata } from "../../services/Api";


const defaulValues = {
  FacultyId: '',
  RoomNo: '',
  Batch: '',
  Course: '',
  TeacherName: '',
  StartTime: '',
  EndTime: '',
  Day: ''

}

const Form = () => {
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
    Changes: "Schedule class",
    Designation: Designation,
    Date: formattedDate

  })






  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [Day, setDay] = React.useState("Select Day");
  
  const DayChangeRole = (event) => {
    setDay(event.target.value);
    console.log(event.target.name, event.target.value);
  };

  const [table, setTable] = useState(defaulValues);

const addTableDetails = async () =>{
  console.log("table.table",table)
  if(Object.values(table).some(value => value === "")){
      
    swal({
      title:"Please fill the fields",
      icon:"error"
    })
  }

 else{
  await addTable(table)
  addLogdata(logData).then((res) => {
    // console.log("Mannual Attendance Log Updated")
  }).catch((err) => {
    console.log("Error ", err) 
  })
  
  swal({
    title:"Values Saved",
    icon:"success"
  })
}

}
  const onValueChange2 = (e) => {
     setTable({ ...table, [e.target.name]: e.target.value });
  };

  return (
    <Box m="20px">
      <Header title="TimeTable" subtitle="Add New TimeTable" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={TimetableSchema}
      >
        {({
          
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
                onInput={handleChange}
                onChange={onValueChange2}
                value={table.FacultyId}
                name="FacultyId"
                error={!!touched.FacultyId && !!errors.FacultyId}
                helperText={touched.FacultyId && errors.FacultyId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RoomNo"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange2}
                value={table.RoomNo}
                name="RoomNo"
                error={!!touched.RoomNo && !!errors.RoomNo}
                helperText={touched.RoomNo && errors.RoomNo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Batch"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange2}
                value={table.Batch}
                name="Batch"
                error={!!touched.Batch && !!errors.Batch}
                helperText={touched.Batch && errors.Batch}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Course"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange2}
                value={table.Course}
                name="Course"
                error={!!touched.Course && !!errors.Course}
                helperText={touched.Course && errors.Course}
                sx={{ gridColumn: "span 2" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="TeacherName"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange2}
                value={table.TeacherName}
                name="TeacherName"
                error={!!touched.TeacherName && !!errors.TeacherName}
                helperText={touched.TeacherName && errors.TeacherName}
                sx={{ gridColumn: "span 2" }}
              />
                 
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="StartTime"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange2}
                value={table.StartTime}
                name="StartTime"
                error={!!touched.StartTime && !!errors.StartTime}
                helperText={touched.StartTime && errors.StartTime}
                sx={{ gridColumn: "span 2" }}
              />
                   <TextField
                fullWidth
                variant="filled"
                type="time"
                label="EndTime"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange2}
                value={table.EndTime}
                name="EndTime"
                error={!!touched.EndTime && !!errors.EndTime}
                helperText={touched.EndTime && errors.EndTime}
                sx={{ gridColumn: "span 2" }}
              />
          
               <Box  sx={{ minWidth: 120 }}>
                 
                 <FormControl fullWidth>
                 
                   <InputLabel sx={{ mt: 2 }} id="DaySelectBox">Select Day</InputLabel>
                   <Select
                     labelId="Select Day"
                     fullWidth
                     variant="filled"
                     value={Day}
                     label="Day"
                     name="Day"
                     onBlur={handleBlur}
                     onChange={(e)=>{
                      DayChangeRole(e)
                      onValueChange2(e)
                     }}
                     error={!!touched.Day && !!errors.Day}
                     helperText={touched.Day && errors.Day}
                     // sx={{ gridColumn: "span 2" }}

                   >
                     <MenuItem value={'monday'}>Monday</MenuItem>
                     <MenuItem value={'tuesday'}>Tuesday</MenuItem>
                     <MenuItem value={'wednesday'}>Wednesday</MenuItem>
                     <MenuItem value={'thursday'}>Thursday</MenuItem>
                     <MenuItem value={'friday'}>Friday</MenuItem>
                     <MenuItem value={'saturday'}>Saturday</MenuItem>
                     <MenuItem value={'sunday'}>Sunday</MenuItem>

                   </Select>
                   
                 </FormControl>
                 
               </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={()=> addTableDetails()} disabled={Object.keys(errors).length > 1}>
                Create New TimeTable
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
  FacultyId: '',
  RoomNo: '',
  Batch: '',
  Course: '',
  TeacherName: '',
  StartTime: '',
  EndTime: '',
  Day: ''
};

export default Form;