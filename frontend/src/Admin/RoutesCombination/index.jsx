import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import Dashboard from "../dashboard";
import Team from "../team";
import Timetable from "../TimeTable";
import Attendance from "../Attendance";
import Form from "../form";
import Timetableform from "../TimetableForm";
import ViewLogs from "../ViewLogs";
import FAQ from "../faq";
import MannualAttendance from "../MannualAttendance";
import TeacherDisplay from "../TeacherDisplay";
import NewTeacher from "../NewTeacher";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext ,useMode} from "../../theme";



const UserTypes={
  Admin:'Admin',
  Coordinator:'Coordinator',
  Supervisor:'Supervisor'
}
const CurrentUser=UserTypes.Admin;

const RoutesCombination=()=>{

  const location=useLocation();
  console.log("Routes Value is ")
  console.log(location.state);
  console.log("Routes Value is ")

  const GetRole=localStorage.getItem("Role");
  console.log("Role from Local storage is : ",GetRole);




  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
<>



{
  <div className="container">
   
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div>there is value {location.state.RoleValue}</div>
          <Sidebar designation={CurrentUser} isSidebar={isSidebar}   />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/team" element={<AdminElement><Team /></AdminElement>} />
            <Route exact path="/logs" element={<AdminElement><ViewLogs /></AdminElement>} />
            <Route exact path="/form" element={<AdminElement><Form /></AdminElement>} />


            <Route exact path="/Attendance" element={<AdminCordSupElement><Attendance /></AdminCordSupElement>} />
            <Route exact path="/Timetableform" element={<AdminCordSupElement><Timetableform /></AdminCordSupElement>} />
            <Route exact path="/Timetable" element={<AdminCordSupElement><Timetable /></AdminCordSupElement>} />
            <Route exact path="/MannualAttendance" element={<AdminCordSupElement><MannualAttendance /></AdminCordSupElement>} />

            <Route exact path="/NewTeacher" element={<AdminCordElement><NewTeacher /></AdminCordElement>} />
            <Route exact path="/Teachers" element={<AdminCordElement><TeacherDisplay /></AdminCordElement>} />

            <Route  path="*" element={<FAQ />} />
            {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
            
            </Routes>
           </main>
         </div>
       </ThemeProvider>
    </ColorModeContext.Provider>
    </div>
}

</>
  );

}
export default RoutesCombination



function AdminElement({children}){
  
  if(CurrentUser===UserTypes.Admin )
  {
    return<>{children}</>
  }


  }
function AdminCordElement({children}){
  
  if(CurrentUser===UserTypes.Admin || CurrentUser===UserTypes.Coordinator)
  {
    return<>{children}</>
  }


  }
  function AdminCordSupElement({children}){
  
    if(CurrentUser===UserTypes.Admin || CurrentUser===UserTypes.Coordinator || CurrentUser===UserTypes.Supervisor)
    {
      return<>{children}</>
    }
  
  
    }
  //   function SupCordElement({children}){
  
  //     if(CurrentUser===UserTypes.Supervisor || CurrentUser===UserTypes.Coordinator)
  //     {
  //       return<>{children}</>
  //     }
    
    
  //     }
  // function CoordinatorElement({children}){
  
  //   if( CurrentUser===UserTypes.Coordinator)
  //   {
  //     return<>{children}</>
  //   }
  
  
  //   }
  

