import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Teacherloggingout } from "../../Admin/store/slice";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarTeacher = () => {


  const navigate = useNavigate()

  const dispatch=useDispatch()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  
  const onLogout = () => {
  

    removeLocalStorage().then(() => {
      dispatch(Teacherloggingout())

      navigate('/Teacher');
    });
  };

  const removeLocalStorage = () => {
    return new Promise((resolve) => {
      window.localStorage.clear();
      resolve();
    });
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
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
        <Menu iconShape="square">
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
                  TEACHERS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center"  bgcolor="#D5DCDD" >
                <img
                  alt="profile-user"
                  width="30px"
                  height="30px"
                  src={`../../assets/face-id.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                <h1
                style={{color: 'Black', marginLeft: '10px'}}
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

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/Teacherdashboard"
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
           
            {/* <Item
              title="Timetable"
              to="/Teacherdashboard/TeacherTimetable"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
             <Item
              title="Attendance"
              to="/Teacherdashboard/TeacherAttendance"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          
            <Item
              title="Timetable"
              to="/Teacherdashboard/TimetableTeacher"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


<Item
              title="Logout"
              to="/Teacher"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={onLogout}

            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {/* Pages */}
            </Typography>
            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarTeacher;
