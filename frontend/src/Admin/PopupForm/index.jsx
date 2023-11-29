import { DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import Dialog from '@mui/material/Dialog';


export default function index(props) {
    const {title,children,openPopup,setOpenpopup}=props;
  return (
   <Dialog open={openPopup}>
    <DialogTitle>
        <div>
            Tittle
        </div>
    </DialogTitle>
    <DialogContent>
        <div>Content</div>
    </DialogContent>
   </Dialog>
  )
}
