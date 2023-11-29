import { Box } from "@mui/material";
import React, { useState } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

import {
  FormControl,
} from '@mui/material';

import {
  FormLabel,
  FormControlLabel,
} from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { addLogdata } from "../../services/Api";
import { useEffect } from 'react';

const UpdateUserPermission = ({ rowData }) => {
  const currentuser = JSON.parse(localStorage.getItem('user'));
  const { FacultyID } = currentuser;

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const formattedTime = currentDate.toISOString();

  const [logData, setLogData] = useState({
    FacultyID: FacultyID || "",
    Time: formattedTime,
    Changes: "Update Permissions",
    Designation: "Admin", 
    Date: formattedDate

  })
  const [formData, setFormData] = useState(rowData);
  useEffect(() => {
    setFormData(rowData);
    // setRole(formData.Role)
    // setGender(formData.Gender)


  }, [rowData]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
//   console.log("props", props.facultyId)
  const [selectedPermissions, setSelectedPermissions] = useState({
    ViewTeam: formData.ViewTeam,
    UpdateTeam: formData.UpdateTeam,
    DeleteTeam: formData.DeleteTeam,
    AddTeam: formData.AddTeam,
    ViewTeacher: formData.ViewTeacher,
    UpdateTeacher: formData.UpdateTeacher,
    DeleteTeacher: formData.DeleteTeacher,
    AddTeacher: formData.AddTeacher,
    ViewTimetable: formData.ViewTimetable,
    UpdateTimetable: formData.UpdateTimetable,
    DeleteTimetable: formData.DeleteTimetable,
    AddTimetable: formData.AddTimetable,
    ViewAttendance: formData.ViewAttendance,
    UpdateAttendance: formData.UpdateAttendance,
    DeleteAttendance: formData.DeleteAttendance,
    AddAttendance: formData.AddAttendance,
    ViewLogs: formData.ViewLogs,
    // facultyId:props?.facultyId || ""
  });

  const handleCheckboxChange = (event) => {
    setSelectedPermissions({
      ...selectedPermissions,
      [event.target.name]: event.target.checked,
    });
  };
const facultyId=rowData.FacultyID;
console.log(" faculty Id permission is ::",formData.facultyId)
const handleFormSubmit = async (event) => {
  event.preventDefault();
  console.log(selectedPermissions);
  try {
    console.log(" faculty Id permission is ::",facultyId)

    // Make a POST request to the backend API
    const response = await axios.patch(`http://localhost:5000/dashboard/roles/${rowData.FacultyID}`, {
      data: JSON.stringify(selectedPermissions),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle the response from the backend if needed
    console.log(response.data);
  } catch (error) {
    // Handle errors if any
    console.error('Error:', error);
  }

  addLogdata(logData)
    .then((res) => {
      console.log("Updated permissions log added");
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};

  // const handleFormSubmit = async(event) => {
  //   event.preventDefault();
  //   console.log(selectedPermissions);
  //   try {
  //     // Make a POST request to the backend API
  //     const response = await axios.patch(`http://localhost:5000/dashboard/team/Permissions${facultyId}`, selectedPermissions);

  //     // Handle the response from the backend if needed
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle errors if any
  //     console.error('Error:', error);
  //   }
  //   addLogdata(logData).then((res) => {
  //     console.log("updated permissions log added")
  //   }).catch((err) => {
  //     console.log("Error ", err)
  //   })
  // };

  return (
    <Box m="20px" display="flex" justifyContent={"center"}>
      <form onSubmit={handleFormSubmit}>
        <Box
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Box >
            <FormControl component="fieldset" sx={{ marginLeft: "30px" }}>
              <FormLabel component="legend">Team Permission</FormLabel>
              <FormGroup aria-label="position" column>
                <FormControlLabel
                  value="ViewTeam"
                  control={<Checkbox checked={selectedPermissions.ViewTeam} onChange={handleCheckboxChange} name="ViewTeam" />}
                  label="ViewTeam"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="UpdateTeam"
                  control={<Checkbox checked={selectedPermissions.UpdateTeam} onChange={handleCheckboxChange} name="UpdateTeam" />}
                  label="UpdateTeam"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="DeleteTeam"
                  control={<Checkbox checked={selectedPermissions.DeleteTeam} onChange={handleCheckboxChange} name="DeleteTeam" />}
                  label="DeleteTeam"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="AddTeamMember"
                  control={<Checkbox checked={selectedPermissions.AddTeamMember} onChange={handleCheckboxChange} name="AddTeamMember" />}
                  label="AddTeamMember"
                  labelPlacement="top"
                />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ marginLeft: "20px" }}>
              <FormLabel component="legend">Teacher Permissions</FormLabel>
              <FormGroup aria-label="position" column>
                <FormControlLabel
                  value="ViewTeacher"
                  control={<Checkbox checked={selectedPermissions.ViewTeacher} onChange={handleCheckboxChange} name="ViewTeacher" />}
                  label="ViewTeacher"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="UpdateTeacher"
                  control={<Checkbox checked={selectedPermissions.UpdateTeacher} onChange={handleCheckboxChange} name="UpdateTeacher" />}
                  label="UpdateTeacher"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="DeleteTeacher"
                  control={<Checkbox checked={selectedPermissions.DeleteTeacher} onChange={handleCheckboxChange} name="DeleteTeacher" />}
                  label="DeleteTeacher"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="AddTeacher"
                  control={<Checkbox checked={selectedPermissions.AddTeacher} onChange={handleCheckboxChange} name="AddTeacher" />}
                  label="AddTeacher"
                  labelPlacement="top" 
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox />}
                  label="AddNewTeacher"
                  labelPlacement="top"
                />

              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" sx={{ marginLeft: "20px" }}>
              <FormLabel component="legend">Timetable Permissions</FormLabel>
              <FormGroup aria-label="position" column>


                <FormControlLabel
                  value="ViewTimetable"
                  control={<Checkbox checked={selectedPermissions.ViewTimetable} onChange={handleCheckboxChange} name="ViewTimetable" />}
                  label="ViewTimetable"
                  labelPlacement="top"
                />

                <FormControlLabel
                  value="UpdateTimetable"
                  control={<Checkbox checked={selectedPermissions.UpdateTimetable} onChange={handleCheckboxChange} name="UpdateTimetable" />}
                  label="UpdateTimetable"
                  labelPlacement="top"
                />

                <FormControlLabel
                  value="DeleteTimetable"
                  control={<Checkbox checked={selectedPermissions.DeleteTimetable} onChange={handleCheckboxChange} name="DeleteTimetable" />}
                  label="DeleteTimetable"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="AddTimetable"
                  control={<Checkbox checked={selectedPermissions.AddTimetable} onChange={handleCheckboxChange} name="AddTimetable" />}
                  label="AddTimetable"
                  labelPlacement="top"
                />
              </FormGroup>
            </FormControl>


            <FormControl component="fieldset" sx={{ marginLeft: "20px" }}>
              <FormLabel component="legend">AttendancePermissions</FormLabel>
              <FormGroup aria-label="position" column>


                <FormControlLabel
                  value="ViewAttendance"
                  control={<Checkbox checked={selectedPermissions.ViewAttendance} onChange={handleCheckboxChange} name="ViewAttendance" />}
                  label="ViewAttendance"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="UpdateAttendance"
                  control={<Checkbox checked={selectedPermissions.UpdateAttendance} onChange={handleCheckboxChange} name="UpdateAttendance" />}
                  label="UpdateAttendance"
                  labelPlacement="top"
                />

                <FormControlLabel
                  value="DeleteAttendance"
                  control={<Checkbox checked={selectedPermissions.DeleteAttendance} onChange={handleCheckboxChange} name="DeleteAttendance" />}
                  label="DeleteAttendance"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="AddMannualAttendance"
                  control={<Checkbox checked={selectedPermissions.AddMannualAttendance} onChange={handleCheckboxChange} name="AddMannualAttendance" />}
                  label="AddMannualAttendance"
                  labelPlacement="top"
                />



              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" sx={{ marginLeft: "20px" }}>
              <FormLabel component="legend">Other Permissions</FormLabel>
              <FormGroup aria-label="position" column>

                <FormControlLabel
                  value="ViewLogs"
                  control={<Checkbox checked={selectedPermissions.ViewLogs} name="ViewLogs" onChange={handleCheckboxChange} />}
                  label="ViewLogs"
                  labelPlacement="top"
                />


              </FormGroup>
            </FormControl>





          </Box>


        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Permissions
          </Button>
        </Box>
      </form>

    </Box>

  )
}

export default UpdateUserPermission

