import { Routes, Route } from "react-router-dom";

import Login from "./Admin/Login";

import React from 'react';


import AppRoutes from "./Admin/AppRoutes";
import { createContext } from "react";


import TeacherRoutes from "./Teacher/TeacherRoutes";

// const session = require('express-session');
// const app = express();
// app.use(session({
//   secret: 'your_secret_key_here',
//   resave: false,
//   saveUninitialized: false,
// }));



function App() {
  return (
    <>



      <AppRoutes />

      <TeacherRoutes />






    </>
  )
}
export default App;
// export {Role};

