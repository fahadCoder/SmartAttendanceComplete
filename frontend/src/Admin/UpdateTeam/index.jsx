import React from 'react'
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {  Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import{FormControl} from '@mui/material';
import {UpdateUserSchema} from "../Validation";
import { useEffect } from 'react';
import swal from "sweetalert"
import { addLogdata } from "../../services/Api";

 
const UpdateTeamForm=({ rowData })=> {

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
    Changes: "Update Admin Team member",
    Designation: Designation,
    Date: formattedDate

  })


 
  const [formData, setFormData] = useState(rowData);
  const [Role, setRole] = React.useState('');
  const [Gender, setGender] = React.useState('');

  useEffect(() => {
    setFormData(rowData);
    setRole(formData.Role)
    setGender(formData.Gender)


  }, [rowData]);

  console.log("Update Admin Data ",rowData);
  console.log("Role is  ",  formData.Role);
  console.log("id is :: ",rowData.id);
  
  
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };


  const handleFormSubmit = (values) => {
    console.log(values);
  };
  


  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [Update, setUpdateData] = useState({
    FacultyId: formData.FacultyID,
    Name:formData.Name,
    DOB: formData.dob,
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
    const teacherId = rowData.id;// get the ID of the teacher you want to update
    // console.log("ID for Update Team ; ",formData.id);
    console.log("Update Data is :: ",Update)
    try {
      const response = await fetch(`http://localhost:5000/dashboard/team/${teacherId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Update)
      });
      const data = await response.json();
      addLogdata(logData).then((res) => {
        // console.log("Mannual Attendance Log Updated")
      }).catch((err) => {
        console.log("Error ", err)
      })
      swal({
        title:data.msg,
        icon:"success"
      })

      console.log(data.msg); // success message from the server
    } catch (error) {
      swal({
        title:error.msg,
        icon:"success"
      })
      console.error(error.message);
    }
  };
  

    
  return (
    <div>
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
                required
                variant="filled"
                type="text"
                label="FacultyID"
                onBlur={handleBlur}
                onChange={handleChange2}
              onInput={handleChange}
                value={values.FacultyID}
                defaultValue={formData.FacultyID}
                InputProps={{
                  // readOnly: true
                  disabled: true

                }}

                name="FacultyID"
                error={!!touched.FacultyID && !!errors.FacultyID}
                helperText={touched.FacultyID && errors.FacultyID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange2}
                onInput={handleChange}
                value={values.Name}
                defaultValue={formData.Name}

                name="Name"
                error={!!touched.Name && !!errors.Name}
                helperText={touched.Name && errors.Name}
                sx={{ gridColumn: "span 2" }}
              />
              
            
            
              <FormControl fullWidth>
                <InputLabel sx={{ mt: '12px' }} id="GenderSelectBox">Designation</InputLabel>
                <Select
                  labelId="RoleSelectBox"
                  fullWidth
                  required
                  variant="filled"
                  value={values.Role}
                  defaultValue={formData.Role} // Set the default value here

                  label="Role"
                  name='Role'
                  onBlur={handleBlur}
                  // onChange={handleChangeRole}
                  onChange={handleChange2}
                  onInput={handleChange}
                  error={!!touched.Role && !!errors.Role}
                  helperText={touched.Role && errors.Role}
                  // sx={{ gridColumn: "span 2" }}
                >
                  {/* <MenuItem value={'Admin'}>Admin</MenuItem> */}
                  <MenuItem value={'Coordinator'}>Coordinator</MenuItem>
                  <MenuItem value={'Supervisor'}>Supervisor</MenuItem>
                </Select>
              </FormControl>


                  {/* <FormControl fullWidth>
                 
                 <InputLabel sx={{ mt: '12px' }} id="GenderSelectBox">Designation</InputLabel>
                 <Select
                   labelId="RoleSelectBox"
                   fullWidth
                   required
                   variant="filled"
                   value={Role}
                   defaultValue={formData.Role}

                   label="Role"
                   name='Role'
                   onBlur={handleBlur}
                   onChange={handleChangeRole}
                   error={!!touched.Role && !!errors.Role}
                   helperText={touched.Role && errors.Role}
                   // sx={{ gridColumn: "span 2" }}

                 >
                   {/* <MenuItem value={'Admin'}>Admin</MenuItem> */}
                   {/* <MenuItem value={'Coordinator'}>Coordinator</MenuItem>
                   <MenuItem value={'Supervisor'}>Supervisor</MenuItem>


                 </Select>
                 
               </FormControl> */} 

               <TextField
                fullWidth
                required
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={handleChange2}
                onInput={handleChange}
                value={values.Email}
                defaultValue={formData.Email}

                name="Email"
                error={!!touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
                sx={{ gridColumn: "span 3" }}
              />
             <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={handleChange2}
                onInput={handleChange}
                value={values.Password}
                defaultValue={formData.Password}
                name="Password"
                error={!!touched.Password && !!errors.Password}
                helperText={touched.Password && errors.Password}
                sx={{ gridColumn: "span 2" }}
                required
              />
                 <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="DOB"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={handleChange2}
                 onInput={handleChange}
                value={values.DOB}
                defaultValue={formData.DOB}
                name="DOB"
                error={!!touched.DOB && !!errors.DOB}
                helperText={touched.DOB && errors.DOB}
                sx={{ gridColumn: "span 2" }}
              />

                <TextField
                fullWidth
                required
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
             
             <Box  sx={{ minWidth: 250 }}>
                 
                 <FormControl fullWidth>
                 
                   <InputLabel sx={{ mt: 2 }} id="GenderSelectBox">Gender</InputLabel>
                   <Select
                     labelId="GenderSelectBox"
                     fullWidth
                     required
                     variant="filled"
                     value={values.Gender}
                     defaultValue={formData.Gender}
                     label="Gender"
                     name='Gender'
                     onBlur={handleBlur}
                    //  onChange={handleChangeGender}
                     onChange={handleChange2}
                    onInput={handleChange}
                     error={!!touched.Gender && !!errors.Gender}
                     helperText={touched.Gender && errors.Gender}
                     // sx={{ gridColumn: "span 2" }}

                   >
                     <MenuItem value={'Male'}>Male</MenuItem>
                     <MenuItem value={'Female'}>FeMale</MenuItem>

                   </Select>
                   
                 </FormControl>
                 
               </Box>
             
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
    </div>
  )
}

export default UpdateTeamForm;
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
// import React from 'react'
// import { Box } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import {  Button, TextField } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import {useState} from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import{FormControl} from '@mui/material';
// import {UpdateUserSchema} from "../Validation";
// import { useEffect } from 'react';


// const UpdateTeamForm=({ rowData })=> {

//   const [formData, setFormData] = useState(rowData);

//   useEffect(() => {
//     setFormData(rowData);
//     setRole(formData.Role)
//     setGender(formData.Gender)
//   }, [rowData]);

//   console.log("Default Data is  ",rowData);

// const [Gender, setGender] = React.useState('');
  
//   const handleChangeGender = (event) => {
//     setGender(event.target.value);
//   };


//   const handleFormSubmit = (values) => {
//     console.log(values);
//   };
  

//   const [Role, setRole] = React.useState('');
  
//   const handleChangeRole = (event) => {
//     setRole(event.target.value);
//   };


//   const isNonMobile = useMediaQuery("(min-width:600px)");

//   // ----------------------------------------Update user-------------------
//   const [Update, setUpdateData] = useState({
//     FacultyID: formData.FacultyID,
//     Name: formData.Name,
//     Role:formData.Role,
//     Email: formData.Email,
//     Password:formData.Password,
//     DOB: formData.DOB,
//     Address: formData.Address,
//     Gender: formData.Gender,
    
    
//   });
//   // const initialValues = {
//   //   FacultyID:rowData.FacultyID,
//   //   Name: rowData.Name,
//   //   Email: rowData.Email,
//   //   Password: rowData.Password,
//   //   DOB: rowData.DOB,
//   //   Gender: rowData.Gender,
//   //   Role: rowData.Role,
//   //   Address: rowData.Address,
//   // };
//   const initialValues = {
//     FaacultyID: "",
//     Naame: "",
//     Emaail: "",
//     Paassword: "",
//     DOaB: "",
//     Genader: "",
//     Roale: "",
//     Adadress: "",
//   };
  
//   const handleChange2 = e => {
//     setUpdateData({ ...Update, [e.target.name]: e.target.value });

//   };
  
//   const CallhandleSubmit = async e => {
//     e.preventDefault();
//     // const teacherId = formData.id;// get the ID of the teacher you want to update
//     const teacherId = formData.id;// get the ID of the teacher you want to update

//     try {
//       const response = await fetch(`http://localhost:5000/dashboard/team/${teacherId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
        
//         body: JSON.stringify(Update)
//       });
//       const data = await response.json();
//       console.log("ID for Update Teacher ; ",teacherId);
//       console.log(data.msg); // success message from the server
//     } catch (error) {
//       console.error(error.message);
//     }
//   };



    
//   return (
//     <div>
//        <Box m="20px">
//       {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={UpdateUserSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
            
//                  <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="text"
//                 label="FacultyID"
//                 onBlur={handleBlur}
//                 onChange={handleChange2}
//                 onInput={handleChange}
//                 value={values.FacultyID}
//                 defaultValue={formData.FacultyID}

//                 name="FacultyID"
//                 error={!!touched.FacultyID && !!errors.FacultyID}
//                 helperText={touched.FacultyID && errors.FacultyID}
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="text"
//                 label="Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange2}
//                 onInput={handleChange}
//                 value={values.Name}
//                 defaultValue={formData.Name}

//                 name="Name"
//                 error={!!touched.Name && !!errors.Name}
//                 helperText={touched.Name && errors.Name}
//                 sx={{ gridColumn: "span 2" }}
//               />
              
            
            
                
//               <FormControl fullWidth>
//                  <InputLabel sx={{ mt: '12px' }} id="GenderSelectBox">Designation</InputLabel>
//                  <Select
//                   labelId="RoleSelectBox"
//                   fullWidth
//                   required
//                   variant="filled"
//                   value={Update.Role}
//                   defaultValue={formData.Role} // Set the default value here

//                   label="Role"
//                   name='Role'
//                   onBlur={handleBlur}
//                   onChange={handleChangeRole}
//                   error={!!touched.Role && !!errors.Role}
//                   helperText={touched.Role && errors.Role}
//                   // sx={{ gridColumn: "span 2" }}
//                 >
//                   {/* <MenuItem value={'Admin'}>Admin</MenuItem> */}
//                   <MenuItem value={'Coordinator'}>Coordinator</MenuItem>
//                   <MenuItem value={'Supervisor'}>Supervisor</MenuItem>
//                 </Select>
//               </FormControl>

              

//                <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="email"
//                 label="Email"
//                 onBlur={handleBlur}
//                 onChange={handleChange2}
//                 onInput={handleChange}
//                 value={values.Email}
//                 defaultValue={formData.Email}

//                 name="Email"
//                 error={!!touched.Email && !!errors.Email}
//                 helperText={touched.Email && errors.Email}
//                 sx={{ gridColumn: "span 3" }}
//               />
//              <TextField
//                 fullWidth
//                 variant="filled"
//                 type="Password"
//                 label="Password"
//                 onBlur={handleBlur}
//                 onChange={handleChange2}
//                 onInput={handleChange}
//                 value={values.Password}
//                 defaultValue={formData.Password}
//                 name="Password"
//                 error={!!touched.Password && !!errors.Password}
//                 helperText={touched.Password && errors.Password}
//                 sx={{ gridColumn: "span 2" }}
//                 required
//               />
//                  <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="date"
//                 label="DOB"
//                 onBlur={handleBlur}
//                 onChange={handleChange2}
//                 onInput={handleChange}
//                 value={values.DOB}
//                 defaultValue={formData.DOB}
//                 name="DOB"
//                 error={!!touched.DOB && !!errors.DOB}
//                 helperText={touched.DOB && errors.DOB}
//                 sx={{ gridColumn: "span 2" }}
//               />

//                 <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="text"
//                 label="Address"
//                 onBlur={handleBlur}
//                 onChange={handleChange2}
//                 onInput={handleChange}
//                 value={values.Address}
//                 defaultValue={formData.Address}
//                 name="Address"
//                 error={!!touched.Address && !!errors.Address}
//                 helperText={touched.Address && errors.Address}
//                 sx={{ gridColumn: "span 2" }}
//               />
             
//                            <Box  sx={{ minWidth: 250 }}>
                 
//                                    <FormControl fullWidth>
                                  
//                                      <InputLabel sx={{ mt: 2 }} id="GenderSelectBox">Gender</InputLabel>
//                                      <Select
//                                       labelId="GenderSelectBox"
//                                       fullWidth
//                                       required
//                                       variant="filled"
//                                       value={Update.Gender}
//                                       defaultValue={formData.Gender}
//                                       label="Gender"
//                                       name='Gender'
//                                       onBlur={handleBlur}
//                                       onChange={handleChangeGender}
//                                       error={!!touched.Gender && !!errors.Gender}
//                                       helperText={touched.Gender && errors.Gender}
//                                       // sx={{ gridColumn: "span 2" }}
                 
//                                     >
//                                       <MenuItem value={'Male'}>Male</MenuItem>
//                                       <MenuItem value={'Female'}>FeMale</MenuItem>
                 
//                                     </Select>
                                    
//                                   </FormControl>
                                  
//                                 </Box>
                 
         
                 
             
             
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained" onClick={CallhandleSubmit}>
//                 Update User
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//     </div>
//   )
// }

// export default UpdateTeamForm;
