import Admin from "../models/AdminModel.js";
import Teacher from "../models/TeacherModel.js";
import Permission from "../models/Permissions.js";
import express from 'express';
import session from 'express-session';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
export const createAdmin = async(req, res) =>{
    try {
        await Admin.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}
export const createPermissions = async(req, res) =>{
  const selectedPermissions = req.body; 

console.log("permissions :: ",selectedPermissions);
  // res.status(200).json({ message: 'Permissions received successfully' });
  try {
    await Permission.create(req.body);
    res.status(201).json({msg: "User Created"});
} catch (error) {
    console.log(error.message);
}
}

export const AdminLogin = async (req, res) => {
  try {
    const facultyId = req.body.FacultyID;
    const password = req.body.Password;

    const details = await Admin.findOne({
      where: {
        facultyId: facultyId,
        Password: password,
      },
    });

    if (details) {
      if (password === details.Password) {
        req.session.facultyid = details.FacultyID; // Create session with FacultyID
        const userId = req.session.facultyid; // Access user ID
        console.log("Session ID in AdminLogin:", userId);

        // Retrieve the user's designation from the `details` object
        const designation = details.Role;

        res.status(200).json({ message: "Login successful", designation });
      } else {
        res.status(401).json({ message: "Email and password are incorrect" });
      }
    } else {
      res.status(401).json({ message: "Email and password are incorrect" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};

// export const AdminLogin = async (req, res) => {
//   try {
//     const facultyId = req.body.FacultyID;
//     const password = req.body.Password;
//     // const facultyId = "A45";
//     // const password = "raheel123";

//     const Details = await Admin.findOne({
//       where: {
//         facultyId: facultyId,
//         Password: password,

//       }
//     });

//     if (Details) {
//       if (password === Details.Password) {
//         req.session.facultyid = Details.FacultyID; // create session with FacultyID
//         const userId = req.session.facultyid; // Access us
//          console.log("session id in gettotal admin : ",userId);
//         res.status(200).json({ message: "login successful"});

//       } else {
//         res.status(401).json({ message: "email and password is incorrect" });
//       }
//     } else {
//       res.status(401).json({ message: "email and password is incorrect" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(401).json({ error: error.message });
//   }
// };

export const getTotalAdmin = async (req, res) => {
  // const userId = req.session.facultyid; // Access us
  // console.log("session id in gettotal admin : ",userId);
    try {
      const adminCount = await Admin.count({
        where: { Role: 'Admin' }
      });
      const coordinatorCount = await Admin.count({
        where: { Role: 'Coordinator' }
      });
      const supervisorCount = await Admin.count({
        where: { Role: 'Supervisor' }
      });
      const TeacherCount = await Teacher.count();
      res.status(200).json({ 
        adminCount: adminCount, 
        coordinatorCount: coordinatorCount, 
        supervisorCount: supervisorCount ,
        teacherCount: TeacherCount 

      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Server error' });
    }
    
  };

  export const getAdmins= async(req, res) =>{
    try {
        const response = await Admin.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
  
export const deleteAdmin = async(req, res) =>{
    try {
        await Admin.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}


export const GetPermissions = async (req, res) => {
  try {
    const { facultyId } = req.params; // Retrieve the facultyId from the query parameters
    // const { facultyId } = req.params; // Retrieve the facultyId from the query parameters

  console.log("fac",facultyId)
    const permissions = await Permission.findOne({
      where: {
        facultyId: facultyId // Use the facultyId from the query parameters
      }
    });

    if (!permissions) {
      return res.status(404).json({ error: 'Permissions not found' });
    }

    console.log(permissions);
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    console.log("ID is :: ",req.params.id)
    const teacher = await Admin.findOne({ where: { id: req.params.id } });

    if (!teacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    } 

    await Admin.update(req.body, { where: { id: req.params.id } });

    res.status(200).json({ msg: "Admin Details updated successfully", teacher });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}
export const UppdatePermission = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;
    const selectedPermissions = req.body;

    // Handle the selectedPermissions data as needed
    console.log(selectedPermissions);
    console.log("ID is :: ",facultyId)
    const teacher = await Permission.findOne({ where: { facultyId: 'CO324' } });

    if (!teacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    } 

    // await Permission.update(req.body, { where: { facultyId:'CO324' } });
        await Permission.update(selectedPermissions, { where: { facultyId:'CO324' } });


    res.status(200).json({ msg: "Admin Details updated successfully", teacher });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}



// export const updateAdmin = async(req, res) =>{
//   try {
//       // const { id } = req.params;
//       // const { name, email, phone } = req.body;

//       const teacher = await Teacher.findOne({ where: {  id: req.params.id } });

//       if (!teacher) {
//           return res.status(404).json({ msg: "Teacher not found" });
//       }

//       // teacher.name = name;
//       // teacher.email = email;
//       // teacher.phone = phone;
//       // teacher.FacultyId=req.body.FacultyID;
//       // teacher.name=req.body.name;
//       // teacher.DOB=req.body.DOB;
//       // teacher.email=req.body.email;
//       // teacher.Password=req.body.Password;
//       // teacher.gen=req.body.Gend;
//       // teacher.adde=req.body.FacultyID;



//       await Admin.update(req.body);

//       res.status(200).json({msg: "Admin Details updated successfully", teacher });
//   } catch (error) {
//       console.log(error.message);
//       res.status(500).json({msg: "Internal server error"});
//   }
// }




const flaskApiTrain = 'http://127.0.0.1:8000/train';

// export const TrainModel = async (req, res) => {
//   try {
//     const { folderName } = req.body;
//     const flaskAPIURL = `http://127.0.0.1:8000/train/${folderName}`;

//     // Make a POST request to your Flask API
//     const response = await axios.post(flaskAPIURL);

//     // Return the response from Flask API
//     res.json(response.data);
//   } catch (error) {
//     // Handle any errors that occur during the request
//     res.status(500).json({ error: 'An error occurred during the request.' });
//   }
// };


export const TrainModel= async (req, res) => {
  try {
    const response = await axios.post(flaskApiTrain);
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during model training.' });
  }
}

// export const DatasetCollection=(req, res) => {

//   const { folderName } = req.body;
//   const imageFile = req.file;

//   const datasetFolder = path.join(process.cwd(), 'dataset');
//   const folderPath = path.join(datasetFolder, folderName);

//   // Check if the folder already exists
//   if (fs.existsSync(folderPath)) {
//     // Folder exists, save the image in the existing folder
//     const imageFilePath = path.join(folderPath, imageFile.originalname);
//     fs.renameSync(imageFile.path, imageFilePath);
//     res.status(200).send('Image saved in the existing folder.');
//   } else {
//     // Folder doesn't exist, create a new folder and save the image
//     fs.mkdirSync(folderPath);
//     const imageFilePath = path.join(folderPath, imageFile.originalname);
//     fs.renameSync(imageFile.path, imageFilePath);
//     res.status(200).send('Image saved in a new folder.');
//   }
// }
export const DatasetCollection = (req, res) => {
  const { folderName } = req.body;
  const imageFile = req.file;

  const datasetFolder = 'C:\\Users\\rajaf\\Desktop\\FlaskAPI\\Dataset';
  const folderPath = path.join(datasetFolder, folderName);

  // Check if the folder already exists
  if (fs.existsSync(folderPath)) {
    // Folder exists, save the image in the existing folder
    const imageFilePath = path.join(folderPath, imageFile.originalname);
    fs.renameSync(imageFile.path, imageFilePath);
    res.status(200).send('Image saved in the existing folder.');
  } else {
    // Folder doesn't exist, create a new folder and save the image
    fs.mkdirSync(folderPath);
    const imageFilePath = path.join(folderPath, imageFile.originalname);
    fs.renameSync(imageFile.path, imageFilePath);
    res.status(200).send('Image saved in a new folder.');
  }
};



// const FLASK_API_URL = 'http://127.0.0.1:8000/upload_image';

// export const DatasetCollection = async (req, res) => {
//   try {
//     // Retrieve the image file from the request
//     const imageFile = req.file.buffer;

//     // Get the content type of the image
//     const contentType = req.file.mimetype;

//     // Create a Blob object from the image file data
//     const blob = new Blob([imageFile], { type: contentType });

//     // Create a FormData object and append the image file as a Blob
//     const formData = new FormData();
//     formData.append('image', blob);

//     // Send the FormData object to the Flask API
//     const response = await axios.post(FLASK_API_URL, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Return the response from the Flask API to the frontend
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error sending image to Flask API:', error);
//     res.status(500).json({ error: 'Failed to send image to Flask API' });
//   }
// };



