// import { Box } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";

// const ViewLog = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const columns = [
//     // { field: "id", headerName: "ID", flex: 0.5},
//     {
//       field: "FacultyID",
//       headerName: "FacultyID",
//       type: "text",
//       headerAlign: "left",
//       align: "left",
//       flex: 1,
//     },
//     {
//       field: "Name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "Time",
//       headerName: "Time",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//       flex: 1,
//     },
//     {
//       field: "Changes",
//       headerName: "Changes",
//       type: "text",
//       headerAlign: "left",
//       align: "left",
//       flex: 1,
//     },
//     {
//       field: "Designation",
//       headerName: "Designation",
//       type: "text",
//       headerAlign: "left",
//       align: "left",
//       flex: 1,
//     },
//     {
//       field: "Date",
//       headerName: "Date",
//       flex: 1,
//     },
//     // {
//     //   field: "Time",
//     //   headerName: "Time",
//     //   flex: 1,
//     // },
//     // {
//     //   field: "Date",
//     //   headerName: "Date",
//     //   flex: 1,
//     // },
//   ];

//   return (
//     <Box m="20px">
//       <Header
//         title="Logs"
//         subtitle="List of Logs"
//       />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={mockDataContacts}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ViewLog;
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

const ViewLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    // get data from database and set in a datagrid
const[Logs,setLogs]=useState([]);
const [rows, setRows] = useState([]);

useEffect(()=>{
  getLogs();
},[]);

const getLogs=async()=>{
  const response=await axios.get("http://localhost:5000/dashboard/Logs")
  setLogs(response.data);
  // console.log("hi data added");

  console.log(response.data);
} 

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5},
    {
      field: "FacultyID",
      headerName: "FacultyID",
      type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    // {
    //   field: "Changes",
    //   headerName: "Changes",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "Time",
      headerName: "Time",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Changes",
      headerName: "Changes",
      type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Designation",
      headerName: "Designation",
      type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    // {
    //   field: "Time",
    //   headerName: "Time",
    //   flex: 1,
    // },
    // {
    //   field: "Date",
    //   headerName: "Date",
    //   flex: 1,
    // },
  ];

  return (
    <Box m="20px">
      <Header
        title="Logs"
        subtitle="List of Logs"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          
          columns={columns}
          rows={Logs}
          rowGetter={(i) => rows[i]}
          // onRowClick={handleRowClick}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ViewLog;
