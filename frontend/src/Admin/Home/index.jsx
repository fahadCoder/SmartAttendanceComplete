
import { Routes, Route } from "react-router-dom";
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
import Roles from "../Roles";
import { useEffect,useState } from 'react';
import { GetPermissions } from '../../services/Api';
import { useDispatch, useSelector } from "react-redux";
import { Addadminpermissiondata, Addpermissionsdata } from '../store/slice';
const UserTypes={
  Admin:'Admin',
  Coordinator:'Coordinator',
  Supervisor:'Supervisor'
}
const CurrentUser=UserTypes.Admin;


const Home=()=>{
 

  const dispatch=useDispatch()



    const GetRole=localStorage.getItem("Role");
    // console.log("Role from Local storage is : ",GetRole);
    
    const user = JSON.parse(localStorage.getItem('user'));
    const {FacultyID}=user;
    console.log("Fac",FacultyID)


    const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const isData=useSelector((state)=>state.dashboard.permissions)



  useEffect(() => {
if(FacultyID.includes("AD")){
  dispatch(Addadminpermissiondata({ID:FacultyID}))
}

else{
    GetPermissions(FacultyID)
      .then(data => {
        console.log("ddd",data); // Permissions data for the faculty ID
        dispatch(Addpermissionsdata(data))
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, []);






    return(
        <>




  <div className="container">
   
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar designation={GetRole} userLevel={FacultyID} isSidebar={isSidebar}   />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            
            <Routes>
            <Route path="/" element={<Dashboard />} />
            {isData.ViewTeam?<Route exact path="/team" element={<AdminElement><Team val/></AdminElement>} />:null}
            {isData.ViewLogs?<Route exact path="/logs" element={<AdminElement><ViewLogs /></AdminElement>} />:null}
            <Route exact path="/form" element={<AdminElement><Form /></AdminElement>} />
            {isData.ViewTeam?   <Route path="/roles" element={<AdminElement><Roles /></AdminElement>} />:null}



            {isData.ViewAttendance?<Route exact path="/Attendance" element={<AdminCordSupElement><Attendance /></AdminCordSupElement>} />:null}
            <Route exact path="/Timetableform" element={<AdminCordSupElement><Timetableform /></AdminCordSupElement>} />
            {isData.ViewTimetable?<Route exact path="/Timetable" element={<AdminCordSupElement><Timetable /></AdminCordSupElement>} />:null}
            <Route exact path="/MannualAttendance" element={<AdminCordSupElement><MannualAttendance /></AdminCordSupElement>} />

            <Route exact path="/NewTeacher" element={<AdminCordElement><NewTeacher /></AdminCordElement>} />
            {isData.ViewTeacher? <Route exact path="/Teachers" element={<AdminCordElement><TeacherDisplay /></AdminCordElement>} />:null}

            <Route  path="*" element={<FAQ />} />
            {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
            
            </Routes>
           </main>
         </div>
       </ThemeProvider>
    </ColorModeContext.Provider>
    </div>


</>
    )
}
export default Home

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