import { Box, useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import { Button,TextField} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";

import {TimetableSchema} from "../Validation"

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
 
import{FormControl} from '@mui/material';
import { useEffect } from 'react';
import {useState} from 'react';
import { addLogdata } from "../../services/Api";



function UpdateTimetableForm({ rowData }) {

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
  // addLogdata(logData).then((res) => {
  //   console.log("Mannual Attendance Log Updated")
  // }).catch((err) => {
  //   console.log("Error ", err)
  // })








  const [formData, setFormData] = useState(rowData);
  
  useEffect(() => { 
    setFormData(rowData);
  }, [rowData]);
  console.log("Timetable Data ",formData);


    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
      console.log(values);
    };
    const [Status, SetStatus] = React.useState('Select day');
  
    const handleChangeStatus = (event) => {
      SetStatus(event.target.value);
    };
  return (
    <Box m="20px">
      <Header title="Timetable" subtitle="Update Timetable" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={TimetableSchema}
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
                onChange={handleChange}
                value={values.FacultyID}
                defaultValue={formData.FacultyID}
                name="FacultyID"
                error={!!touched.FacultyID && !!errors.FacultyID}
                helperText={touched.FacultyID && errors.FacultyID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RoomNo"
                onBlur={handleBlur}
                onChange={handleChange}
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
                name="Batch"
                label="Batch"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Batch}
                defaultValue={formData.Batch}
                error={!!touched.Batch && !!errors.Batch}
                helperText={touched.Batch && errors.Batch}
                sx={{ gridColumn: "span 1" }}
              />
            
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Course Name"
                onBlur={handleBlur}
                onChange={handleChange}
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
                type="text"
                label="Teacher Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.TeacherName}
                defaultValue={formData.TeacherName}
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
                onChange={handleChange}
                value={values.StartTime}
                defaultValue={formData.StartTime}
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
                onChange={handleChange}
                value={values.EndTime}
                defaultValue={formData.EndTime}
                name="EndTime"
                error={!!touched.EndTime && !!errors.EndTime}
                helperText={touched.EndTime && errors.EndTime}
                sx={{ gridColumn: "span 1" }}
              />
             
             <FormControl sx={{ minWidth: 250 }}>
                 
                 <InputLabel sx={{ mt: 2 }} id="StatusSelectBox">Day</InputLabel>
               <Select
                 labelId="StatusSelectBox"

                  label="Day"
                  fullWidth
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  name='Day'
                  error={!!touched.Day && !!errors.Day}
                  helperText={touched.Day && errors.Day}
                  sx={{ gridColumn: "span 4" }}



                    // labelId="demo-select-small"
                    id="demo-select-small"
                    // value={Status}
                    value={values.Day}
                    defaultValue={formData.Day}
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value="">
                      {/* <em>None</em> */}
                    </MenuItem>
                    <MenuItem value={"Monday"}>Monday</MenuItem>
                    <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                    <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                    <MenuItem value={"Thursday"}>Thursday</MenuItem>
                    <MenuItem value={"Friday"}>Friday</MenuItem>
                    <MenuItem value={"Saturday"}>Saturday</MenuItem>

                   

                  </Select>
                  </FormControl>



            
                  
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Timetable
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default UpdateTimetableForm
const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      // .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
  });
  const initialValues = {
    // RoomNo: "",
    // Batch: "",
    // Course: "",
    // StartTime: "",
    // EndTime: "",
    // Teacher: "",
    // Date:""
  };