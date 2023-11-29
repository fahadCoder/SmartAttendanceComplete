import React from 'react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import axios from 'axios';
import swal from "sweetalert"
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
class XLSXReader extends React.Component { 
    handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
      
          // Get the first sheet
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      
          // Convert the sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
      
          // Get the header row to extract column names
          const headerRow = jsonData[0];
      
          // Remove the header row from the data
          const dataRows = jsonData.slice(1);
      
          // Map the data rows to objects with named keys
          const formattedData = dataRows.map((row) => {
            const formattedRow = {};
            headerRow.forEach((columnName, columnIndex) => {
              formattedRow[columnName] = row[columnIndex];
            });
            return formattedRow;
          });
      
          // Send data to backend API
          axios.post('http://localhost:5000/dashboard/Timetable', formattedData)
            .then((response) => {
              console.log('Data saved successfully!');
              swal({
                title: response.data.msg,
                icon:"success"
              })
            })
            .catch((error) => {
              swal({
                title:error,
                icon:"error"
              })
              console.error('Error saving data:', error);
            });
        };
      
        reader.readAsArrayBuffer(file);
      };
      

  render() {
    return (
      <div>
        {/* <input type="file" onChange={this.handleFileUpload} /> */}
        <Button variant="contained" color="secondary" component="label" startIcon={<CloudUploadIcon />}>
          Upload File
          <input type="file" style={{ display: "none" }} onChange={this.handleFileUpload} />
        </Button>
      </div>
    );
  }
}

export default XLSXReader;
