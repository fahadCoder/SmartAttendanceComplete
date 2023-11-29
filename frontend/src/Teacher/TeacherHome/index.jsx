import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import TeacherDashboard from "../DashboardTeacher";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext ,useMode} from "../../theme";
import Sidebar from "../Global/SidebarTeacher";
import Topbar from "../Global/TopbarTeacher";
import TeacherAttendance from "../TeacherAttendance";
// import TeacherTimetable from "../TeacherTimetable";
import TimetableTeacher from "../TimetableTeacher";

const UserTypes={
  Admin:'Admin',
  Coordinator:'Coordinator',
  Supervisor:'Supervisor'
}
const CurrentUser=UserTypes.Admin;

const isTeacher = JSON.parse(localStorage.getItem("user"))
const teacherFound = isTeacher?.teacher


const TeacherHome=()=>{
 

    const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


    return(
        <>



{
  <div className="container">
   
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar  isSidebar={isSidebar}   />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            
            <Routes>
            <Route path="/" element={<TeacherDashboard />} />

            <Route path="/TeacherAttendance" element={<TeacherAttendance />} />
            <Route path="/TimetableTeacher" element={<TimetableTeacher />}  />


            <Route  path="*" element={<div>Page Not Found</div>} />
            
            </Routes>
           </main>
         </div>
       </ThemeProvider>
    </ColorModeContext.Provider>
    </div>
}

</>
    )
}
export default TeacherHome;

// function AdminElement({children}){
  
//   if(CurrentUser===UserTypes.Admin )
//   {
//     return<>{children}</>
//   }


//   }
// function AdminCordElement({children}){
  
//   if(CurrentUser===UserTypes.Admin || CurrentUser===UserTypes.Coordinator)
//   {
//     return<>{children}</>
//   }


//   }
//   function AdminCordSupElement({children}){
  
//     if(CurrentUser===UserTypes.Admin || CurrentUser===UserTypes.Coordinator || CurrentUser===UserTypes.Supervisor)
//     {
//       return<>{children}</>
//     }
  
  
//     }