
import * as React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { useState } from "react";
// import{addUser} from'../../services/Api'
import { addUser } from "../../services/Api"
import { TeacherSchema } from "../Validation";
import swal from "sweetalert"
// import {createTeacher} from "../../../"
import { countries } from 'countries-list'; // You will need a package for this, like `countries-list`


import { useNavigate } from 'react-router-dom'
import { addLogdata } from "../../services/Api";

const defaulValue = {
  facultyId: '',
  Name: '',
  DOB: '',
  Email: '',
  Password: '',
  Gender: '',
  Address: '',
  Country: '',
  Experience: ''


}


const NewTeacher = () => {
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
    Changes: "Register New Teacher",
    Designation: Designation,
    Date: formattedDate

  })


  // const [Gender, setGender] = React.useState('');

  const [user, setUser] = useState(defaulValue);

  const navigate = useNavigate()

  const onValueChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // handleChange(e);
   
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    

    // console.log(user);

    
  };

  const addUserDetails = async () => {

    
if(Object.values(user).some(value => value === "")){
console.log("uu",user)

  swal({


    title:"Please fill the fields",
    icon:"error"
  })
}else{



  await addUser(user);
  console.log("Teacher Data ", user);
  addLogdata(logData).then((res) => {
    // console.log("Mannual Attendance Log Updated")
  }).catch((err) => {
    console.log("Error ", err)
  })
  navigate('/dashboard/Teachers')
  //  alert("data successfully save");

  swal({
    title: "Data sucessfuly saved",
    icon: "success"
  })
}
   



    //  navigate(/dashboard/Teachers);
  }

  // const handleChangeGender = (event) => {
  //   setGender(event.target.value);
  //   // console.log(event.target.name, event.target.value)

  // };



  // for mysql database


  const handleSubmit = (event) => {
    event.preventDefault();




    const form = event.target;
    const data = new FormData(form);
    // initialValues("");
    console.log('Form data:', Object.fromEntries(data.entries())); // add this line to log form data

    fetch('/dashboard/Teachers', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  // end mysql


  return (
    <Box m="20px">
      <Header title="Create Teacher" subtitle="Create a New Teacher Profile" />

      <Formik
        onSubmit={handleSubmit}
        // onSubmit={handleFormSubmit}
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
          setFieldValue,
          setFieldTouched,

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
                label="TeacherID"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={onValueChange}
                onInput={handleChange}
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
                label="Name"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange}
                value={values.Name}
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
                onInput={handleChange}
                onChange={onValueChange}
                value={values.DOB}
                name="DOB"
                error={!!touched.DOB && !!errors.DOB}
                helperText={touched.DOB && errors.DOB}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange}
                value={values.Email}
                name="Email"
                error={!!touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Years of Experience"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange}
                value={values.Experience}
                name="Experience"
                error={!!touched.Experience && !!errors.Experience}
                helperText={touched.Experience && errors.Experience}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange}
                value={values.Password}
                name="Password"
                error={!!touched.Password && !!errors.Password}
                helperText={touched.Password && errors.Password}
                sx={{ gridColumn: "span 1" }}
              />

              {/* <Select
                      label="GenderSelectBox"
                      id="Gender"
                      fullWidth
                      variant="filled"
                      
                      onBlur={handleBlur}
                      onInput={handleChange}

                      value={values.Gender}
                      onChange={handleChange}
                      
                      name="Gender"
                      error={!!touched.Gender && !!errors.Gender}
                      helperText={touched.Gender && errors.Gender}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select> */}
<FormControl fullWidth variant="filled">
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="Country"
                name="Country"
                value={values.Country}
                onChange={(e) => {
                  handleChange(e);
                  onValueChange(e);
                }}
                error={touched.Country && !!errors.Country}
                label="Country"
              >
                <MenuItem value="">Select a country</MenuItem>
                {Object.keys(countries).map((code) => (
                  <MenuItem key={code} value={code}>
                    {countries[code].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


              <Box sx={{ minWidth: 120 }}>




                <Select
                  // labelId="GenderSelectBox"
                  label="GenderSelectBox"
                  id="Gender"
                  fullWidth
                  variant="filled"

                  onBlur={handleBlur}
                  onInput={handleChange}
                  // onChange={onValueChange}

                  value={values.Gender}
                  onChange={(e) => {
                    handleChange(e);
                    onValueChange(e);
                  }}
                  // onChange={(e) =>
                  //   setFieldValue("Gender", e.target.value);
                  //   handleChangeGender(e);
                  // }}
                  name="Gender"
                  error={!!touched.Gender && !!errors.Gender}
                  helperText={touched.Gender && errors.Gender}
                // sx={{ mt: 2 }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  {/* <MenuItem value="other">Other</MenuItem> */}
                </Select>


                {/* <Field name="Gender" as="select">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field> */}

              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onInput={handleChange}
                onChange={onValueChange}
                value={values.Address}
                name="Address"
                error={!!touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
                sx={{ gridColumn: "span 2" }}
              />

              {/* <InputLabel id="demo-select-small">Role</InputLabel> */}

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={() => addUserDetails()} >
                Create New Teacher
              </Button>
            </Box>

          </form>
        )}
      </Formik>
    </Box>

  );
};
export default NewTeacher;

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
  Name: '',
  DOB: '',
  Email: '',
  Password: '',
  Gender: '',
  Address: '',
  Country: '',
  Experience: ''
};