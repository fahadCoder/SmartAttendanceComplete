import axios from "axios";
import swal from "sweetalert"


const URL = 'http://localhost:5000';




export const addUser = async (data) => {
  try {
    const response = await axios.post(`${URL}/dashboard/Teachers`, data);
    console.log("Server response: ", response.data);
    // alert(`Server Response : ${response.data}`);
    swal({
      title:response?.data,
      icon:"success"
    })

    return response.data;
  } catch (err) {
    console.log("Error while calling Add user api ", err);
    // alert("Error while calling Add user api ", error);

    swal({
      title:err,
      icon:"error"
    })

    throw err; // rethrow the error to be caught by the calling function
  } 
};

export const updateTeacher = async (data, id) => {
  try {
    const response = await axios.patch(`${URL}/dashboard/Teachers/${id}`, data);
    console.log("Server response: ", response.data);
    // alert(`Server Response : ${response.data}`);
    swal({
      title:response?.data,
      icon:"success"
    })

    return response.data;
  } catch (error) {
    console.log("Error while calling Update teacher api ", error);
    // alert("Error while calling Add user api ", error);
    swal({
      title:error,
      icon:"error"
    }) 
    throw error; // rethrow the error to be caught by the calling function
  }
};

export const deleteTeacher = async (id) => {
      fetch(`${URL}/dashboard/Teachers/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => {
        swal({
          title:data.msg,
          icon:"success"
        })
        console.log(data.msg); // success message from the server
        // update the UI or perform other actions as needed
      })
      swal({
        title:error,
        icon:"error"
      })
      .catch(error => console.error(error));
}

export const deleteAttendance = async (id) => {
  fetch(`${URL}/dashboard/Attendance/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.msg); // success message from the server
    // update the UI or perform other actions as needed
    swal({
      title:data.msg,
      icon:"success"
    })
  })
  
  .catch(error => console.error(error));
  
}

export const deleteTimetable = async (id) => {
  fetch(`${URL}/dashboard/Timetable/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.msg); // success message from the server
    // update the UI or perform other actions as needed
  })
  .catch(error => console.error(error));
}


export const addManualAttendance = async (data) => {
  try {
    const response = await axios.post(`${URL}/dashboard/Attendance`, data);
    if (response.data.msg) {
      // Show success popup
      // alert(response.data.msg);
      swal({
        title:response.data,
        icon:"error"
      })

    } else if (response.data.error) {
      // Show error popup
      swal({
        title:error.response.data.error,
        icon:"error"
      })
      // alert(response.data.error);
    }
    swal({
      title:response.data.error,
      icon:"success"
    })
    return response.data.error;
  } catch (error) {
    swal({
      title:error.response.data.error,
      icon:"error"
    })
    // console.log("Attendance Not marked ", error);
    // alert("Attendance not marked");
  }
};


//********Time Table */

export const addTable = async (data) => {
  try {
    return await axios.post(`${URL}/dashboard/Timetable`, data);
  } catch (error) {
    console.log("Error while calling Add timetable api ", error);
  }
};
export const Login =async(data)=>{
  try {
    const response= await axios.post(`${URL}/teacher`, data);
    console.log("Server Response : ",response.data);
    // alert(JSON.stringify(response.data));

   
    localStorage.setItem("FacultyID", JSON.stringify(response.data.facultyId));
    // if (response.data === 'ChangePassword') 
    // {
    //   window.location.href = '/OneTimePassword';
    // } 
    const facultyid=response.data.facultyId;
    console.log("facultyid  Response : ",facultyid);

    if (response.data.msg === 'ChangePassword') {
      // Pass the facultyId as a query parameter in the URL
      // window.location.href = `/OneTimePassword?facultyId=${response.data.facultyId}`;
      window.location.href = `/OneTimePassword`;

    }
    else if (response.data.msg === 'Dashboard')
     {
      window.location.href = '/Teacherdashboard';
    }
  

    // Redirect user to dashboard
    // window.location.href = '/Teacherdashboard';
    return response.data;
  } catch (error) {
    console.log("Access Denied ", error);
    // alert("Access Denied ", error);

    swal({
      title: "Login Failed",
      icon:"error"
    })
    throw error;
  } 
}
// export const Login =async(data)=>{
//   try {
//     const response= await axios.post(`${URL}/teacher`, data);
//     console.log("Server Response : ",response.data);
//     alert(JSON.stringify(response.data));

   
//     localStorage.setItem("FacultyID", JSON.stringify(response.data.facultyId));
//     // if (response.data === 'ChangePassword') 
//     // {
//     //   window.location.href = '/OneTimePassword';
//     // } 
//     const facultyid=response.data.facultyId;
//     console.log("facultyid  Response : ",facultyid);

//     if (response.data === 'ChangePassword') {
//       // Pass the facultyId as a query parameter in the URL
//       window.location.href = `/OneTimePassword`;

//       // window.location.href = `/OneTimePassword?facultyId=${response.data.facultyId}`;
//     }
//     else if (response.data === 'Dashboard')
//      {
//       window.location.href = '/Teacherdashboard';
//     }
  

//     // Redirect user to dashboard
//     // window.location.href = '/Teacherdashboard';
//     return response.data;
//   } catch (error) {
//     console.log("Access Denied ", error);
//     alert("Access Denied ", error);

//     swal({
//       title: "Login Failed",
//       icon:"error"
//     })
//     throw error;
//   } 
// }

export const AdminLogin =async(data)=>{
  try {
    // const response= await axios.post(`${URL}/`, data);
    // console.log("Server Response : ",response.data);
    // // alert(JSON.stringify(response.data));
    // // const data = response.data; // Extract the data from the response

    // // Handle the data as needed
    // // console.log(data.message); // Log the login message
    // console.log("Designation is ",response.data.designation); // Log the user's designation
    // swal({
    //   title: "Succesfully Logged In",
    //   icon:"success"
    // })
    const response = await axios.post(`${URL}/`, data);
    const data2 = response.data; // Extract the data from the response

    // Handle the data as needed
    console.log(data2.message); // Log the login message
    console.log("Designation is :: ",data2.designation); // Log the user's designation
    localStorage.setItem('Designation', JSON.stringify(data2.designation));
   
// localStorage.setItem("FacultyID",JSON.stringify(response.data));


    // Redirect user to dashboard
    // window.location.href = '/dashboard';
    return response.data;
  } catch (error) {
    console.log("Access Denied ", error);
    // alert("Access Denied ", error);

    swal({
      title: "Login Failed Try Again",
      icon:"error"
    })
        throw error;
  } 
}

export const getTeacherTotal = async() =>{
  try {
      const response = await fetch('/dashboard'); 
      const data = await response.json();
      console.log(data); // display the response data in the console
      return data;
  } catch (error) {
      console.log(error.message);
  }
}

export const addAdmin = async (data) => {
  try {
    const response = await axios.post(`${URL}/dashboard/team`, data);
    console.log("Server response: ", response.data);
    // alert(`Server Response : ${response.data}`);
    swal({
      title:response.data.msg,
      icon:"success"
    })

    return response.data;
  } catch (error) {
    console.log("Error while calling Add user api ", error);
    // alert("Error while calling Add user api ", error);
    swal({
      title:error,
      icon:"error"
    })

    throw error; // rethrow the error to be caught by the calling function
  } 
};

export const deleteAdmin = async (id) => {
  fetch(`${URL}/dashboard/team/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.msg); // success message from the server
    // update the UI or perform other actions as needed
    swal({
      title:res,
      icon:"success"
    })
  })
  swal({
    title:res,
    icon:"error"
  })

  .catch(error => console.error(error));
}

export const getTeacherAttendanceById = async (id) => {
  try {
    const response = await axios.get(`${URL}/Teacherdashboard/TeacherAttendance/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTeacherTimetableById = async (id) => {
  try {
    const response = await axios.get(`${URL}/Teacherdashboard/TimetableTeacher/${id}`);
    console.log("timetable data is :: ",response.data)
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};












export const addLogdata = async (data) => {
  console.log("called",data)
  try {
    const response = await axios.post(`${URL}/dashboard/addlog`, data);
    if (response.data.msg) {
      // Show success popup
      // alert(response.data.msg);
      // swal({
      //   title:response?.data?.msg,
      //   icon:"success"
      // })
      console.log("Logs Data",data)
    } else if (response.data.error) {
      // Show error popup
      // alert(response.data.error);

      swal({
        title:response?.data?.error,
        icon:"error"
      })
    }
    return response.data;
  } catch (error) {
    console.log("Log Not marked ", error);
    // alert("Log data not added");

    swal({
      title:"Logs data not added",
      icon:"error"
    })
  }
}


export const GetPermissions = async (facultyId) => {
  console.log("fac",facultyId)
  try {
    const response = await fetch(`http://localhost:5000/dashboards/${facultyId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch permissions');
  }
};
export const ChangePasswordOneTime =async(data)=>{
  try {
    console.log("ddata is :: ",data);
    const response= await axios.post(`${URL}/OneTimePassword`, data);
    console.log("Server Response checker: ",response.data);
    alert("alrt from here",JSON.stringify(response.data));
    // Redirect user to again Login
    window.location.href = '/Teacher';
    return response.data;
  } catch (error) {
    console.log("Access Denied ", error);
    alert("Access Denied ", error);

    throw error;
  } 
}