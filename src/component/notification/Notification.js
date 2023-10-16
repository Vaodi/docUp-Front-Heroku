import React from "react";
import { useState, useEffect } from "react";
import "./Notification.scss";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Axios from "axios";

export default function Notifications(props) {

  const [open, setOpen] = React.useState(true);
  
  console.log("my rid" + props.rid)
  const closeNotif = async () => {

    try {
  
      await Axios ({
          method: "PUT",
          withCredentials: true,
          data: {
            notif_id : props.rid

          },
          
           url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/notifClosed"  ,
        
      })
  
    } catch (error) {
      console.log(error);
    }


  }

    return (
      <div className="header">
      { !props.closed ? 
  <Collapse in={open}>
      <Alert 
           action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                closeNotif();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        
          
       severity="success">{props.message}
       
       </Alert>
       </Collapse>

      : null}
      


      </div>
    );
  }