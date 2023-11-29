import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Clearpermissiondata } from "../store/slice";

const UserTypes = {
  Admin: 'Admin',
  Coordinator: 'Coordinator',
  Supervisor: 'Supervisor'
}


const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onLogout = () => {
    localStorage.clearItem("user")

  }
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        onClick && onClick();
      }}

      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = (props) => {
  const navigate = useNavigate()
  // const n=props.name;
const currentDesignation=JSON.parse(localStorage.getItem("user"))
// console.log("cur",currentDesignation)
let designationToshow="";
if(currentDesignation){
  if(currentDesignation.FacultyID.startsWith("AD")){
    designationToshow="Admin"
  }else if(currentDesignation.FacultyID.startsWith("SUP")){
    designationToshow="Supervisor"
  }else if(currentDesignation.FacultyID.startsWith("CO")){
    designationToshow="Cordinator"
  }
}

  const isData = useSelector((state) => state.dashboard.permissions)
console.log("isdata",isData)
const dispatch=useDispatch()


  const desi = props.designation;
  //  console.log(desi);
  const Level = props.userLevel
  const CurrentUser = desi;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const onLogout = () => {
    localStorage.removeItem("user");
    dispatch(Clearpermissiondata())
    navigate("/")
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        height: '10%',

      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ height: "100vh" }} >

        <Menu iconShape="square" >

          {/* LOGO AND MENU ICON */}
          <MenuItem

            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],

            }}

          >

            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {/* <div>{UserTypes}</div>   */}
                  {/* <p>{UserTypes}</p> */}
                  {/* here */}
                  <b>{designationToshow || ""}</b>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>


            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center" bgcolor="#D5DCDD" >
                <img
                  alt="profile-user"
                  width="30px"
                  height="30px"
                  src={`../../assets/face-id.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                <h1
                  style={{ color: 'Black', marginLeft: '10px' }}
                > Smart Attendance</h1>
              </Box>
              <Box textAlign="center">

              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color="green"
                  // fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* {desi} */}
                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  SAMS
                </Typography> */}
              </Box>
            </Box>
          )}

          {console.log("lEVEL", Level.includes("SUP"))}
          {

            Level.includes("AD") ?
              <>
                <Item
                  title="Dashboard"
                  to="/dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}
                <Item
                  title="Admin Team"
                  to="/dashboard/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="User Permissions"
                  to="/dashboard/roles"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Teachers"
                  to="/dashboard/Teachers"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Attendence"
                  to="/dashboard/Attendance"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Timetable"
                  to="/dashboard/Timetable"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Logs"
                  to="/dashboard/logs"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="LogOut"
                  to="/"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onClick={onLogout}

                />
              </>
              :
              <>
                <Item
                  title="Dashboard"
                  to="/dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                {(isData?.ViewTeam) ?

                  <Item
                    title="Admin Team"
                    to="/dashboard/team"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  :
                  null
                }
                {(isData?.ViewTeacher) ?

                  <Item
                    title="Manage Teachers"
                    to="/dashboard/Teachers"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  :
                  null
                }
                {(isData?.ViewAttendance) ?
                  <Item
                    title="Attendence"
                    to="/dashboard/Attendance"
                    icon={<ContactsOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  :
                  null
                }

                {(isData?.ViewTimetable) ?
                  <Item
                    title="Timetable"
                    to="/dashboard/Timetable"
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  :
                  null
                }

                {(isData?.ViewLogs) ?
                  <Item
                    title="Logs"
                    to="/dashboard/logs"
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  :
                  null
                }

                <Item
                  title="LogOut"
                  to="/"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onClick={onLogout}

                />
              </>
          }


        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
