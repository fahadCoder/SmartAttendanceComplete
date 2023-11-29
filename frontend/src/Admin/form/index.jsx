import * as React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import NewPermissions from "../InsertPermissions"
import swal from "sweetalert"
import { UpdateUserSchema } from "../Validation";
import {
  FormControl,
  FormLabel,
  FormControlLabel,


} from '@mui/material';

import { useState } from "react";

import { addAdmin, addLogdata } from "../../services/Api";


import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



function BootstrapDialogTitle(props) {






  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}




const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const currentuser = JSON.parse(localStorage.getItem('user'));
  const {FacultyID}=currentuser;


  const handleFormSubmit = (values) => {
    console.log(values);
  };

const [isError,setisError]=useState(false)
  const [updateFormOpen, setUpdateformOpen] = useState(false)



  const [showBtn, setshowBtn] = React.useState(false);

  const handleClickOpen = () => {
    setUpdateformOpen(true);
  };
  const handleClose = () => {
    setUpdateformOpen(false);
  };




  const [Role, setRole] = React.useState('Select Role');

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const [Gender, setGender] = React.useState('Select Gender');

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const [Admin, setAdmin] = useState(initialValues);

  const addTableDetails = async () => {


if(Object.values(Admin).some(value => value === "")){
  swal({
    title:"Please fill the fields",
    icon:"error"
  })
}else{
    
  if (Admin.Role === "Admin") {
    Admin.FacultyID = "AD" + Admin.FacultyID;
  } else if (Admin.Role === "Supervisor") {
    Admin.FacultyID = "SUP" + Admin.FacultyID;
  } else if (Admin.Role === "Coordinator") {
    Admin.FacultyID = "CO" + Admin.FacultyID;
  }

  console.log(Admin);
  addAdmin(Admin).then((res) => {
    // alert("data successfully save");
    // swal({
    //   title: "Data Succesfully Saved",
    //   icon:"success"
    // })

    addLogdata(logData).then((rest) => {
      console.log("logs data added")
    }).catch((err) => {
      console.log("Error in saving logs", err)
    })

    setshowBtn(true)

  }).catch((err) => {
    // alert("Oops error in submitting")
    swal({
      title: "Oops error in submitting",
      icon:"error"
    })
  })

}





  }






  const onValueChange2 = (e) => {
    setAdmin({ ...Admin, [e.target.name]: e.target.value });
  };


  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const formattedTime = currentDate.toISOString();

  const [logData, setLogData] = useState({
    FacultyID: FacultyID,
    Time: formattedTime,
    Changes: "Added the user",
    Designation: "Admin",
    Date: formattedDate

  })


  return (
    <>
      <Box m="20px">
        {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={UpdateUserSchema}
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
                  type="number"
                  label="FacultyID"
                  onBlur={handleBlur}
                  onInput={handleChange}
                  onChange={onValueChange2}
                  value={values.FacultyID}
                  name="FacultyID"
                  error={!!touched.FacultyID && !!errors.FacultyID}
                  helperText={touched.FacultyID && errors.FacultyID}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onInput={handleChange}
                  onChange={onValueChange2}
                  value={values.Name}
                  name="Name"
                  error={!!touched.Name && !!errors.Name}
                  helperText={touched.Name && errors.Name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onInput={handleChange}
                  onChange={onValueChange2}
                  value={values.Email}
                  name="Email"
                  error={!!touched.Email && !!errors.Email}
                  helperText={touched.Email && errors.Email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onInput={handleChange}
                  onChange={onValueChange2}
                  value={values.Password}
                  name="Password"
                  error={!!touched.Password && !!errors.Password}
                  helperText={touched.Password && errors.Password}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="DOB"
                  onBlur={handleBlur}
                  onInput={handleChange}
                  onChange={onValueChange2}
                  value={values.DOB}
                  name="DOB"
                  error={!!touched.DOB && !!errors.DOB}
                  helperText={touched.DOB && errors.DOB}
                  sx={{ gridColumn: "span 1" }}
                />
                <Box sx={{ minWidth: 120 }}>

                  <FormControl fullWidth>

                    <InputLabel sx={{ mt: 2 }} id="GenderSelectBox">Gender</InputLabel>
                    <Select
                      labelId="GenderSelectBox"
                      fullWidth
                      variant="filled"
                      value={Admin.Gender}
                      label="Gender"
                      name='Gender'
                      onBlur={handleBlur}
                      //  onChange={handleChangeGender}
                      onInput={handleChange}
                      onChange={onValueChange2}
                      error={!!touched.Gender && !!errors.Gender}
                      helperText={touched.Gender && errors.Gender}
                    // sx={{ gridColumn: "span 2" }}

                    >
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Female'}>FeMale</MenuItem>

                    </Select>

                  </FormControl>

                </Box>
                <Box sx={{ minWidth: 120 }}>

                  <FormControl fullWidth>

                    <InputLabel sx={{ mt: 2 }} id="RoleSelectBox">Designation</InputLabel>
                    <Select
                      labelId="RoleSelectBox"
                      fullWidth
                      variant="filled"
                      value={Admin.Role}
                      label="Designation"
                      onBlur={handleBlur}
                      name='Role'
                      // onChange={handleChangeRole}
                      onInput={handleChange}
                      onChange={onValueChange2}
                      error={!!touched.Role && !!errors.Role}
                      helperText={touched.Role && errors.Role}
                    // sx={{ gridColumn: "span 2" }}

                    >
                      {/* <MenuItem value={'Admin'}>Admin</MenuItem> */}
                      <MenuItem value={'Coordinator'}>Coordinator</MenuItem>
                      <MenuItem value={'Supervisor'}>Supervisor</MenuItem>
                      {/* <MenuItem value={4}>Teacher</MenuItem> */}

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
                  onInput={handleChange}
                  onChange={onValueChange2}
                  value={values.Address}
                  name="Address"
                  error={!!touched.Address && !!errors.Address}
                  helperText={touched.Address && errors.Address}
                  sx={{ gridColumn: "span 2" }}
                />

              </Box>

              {/* ------------------------below Selection----------------------------- */}



              <Box display="flex" justifyContent="end" mt="20px">
                {
                  showBtn ?
                    <Button type="submit" onClick={() => setUpdateformOpen(true)} color="secondary" variant="contained" style={{ marginRight: "15px" }}>
                      Update Permissions
                    </Button>
                    :
                    null
                }
                <Button type="submit" color="secondary" variant="contained" onClick={() => addTableDetails()} >
                  Create New User
                </Button>
              </Box>

            </form>
          )}
        </Formik>
      </Box>




      <div>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={updateFormOpen}
          maxWidth="auto"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            User Permissions
          </BootstrapDialogTitle>
          <DialogContent dividers>

            <NewPermissions facultyId={Admin.FacultyID} />
          </DialogContent>

        </BootstrapDialog>
      </div>
    </>
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
  FacultyID: "",
  Name: "",
  Email: "",
  Password: "",
  DOB: "",
  Gender: "",
  Role: "",
  Address: "",
};

export default Form;
