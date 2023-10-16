import React from "react";
import "./Input.scss";
import Button from "@mui/material/Button";

// objValue, onChange, index, deleteField are props here 

export default function Input({ objValue, onChange, index, deleteField}) {
  const { docName, docDescription, value } = objValue;
 
  return (
    <div className="input-group">
    <div className="lab1">
      <label htmlFor={docName}>{docName} :</label>
      </div>
      <div className="lab2">
      <label htmlFor={docDescription}>{docDescription}</label>
      </div>
      {/* <div className="input">
        <input
          type={type || "text"}
          id={label}
          value={value || ""}
          description={type}
          onChange={(e) => onChange(e, index)}
        /> */}
        <div className="lab3">
            <Button variant="outlined" color="error"  style={{width:'70px', height:'20px'}} onClick={(e) => deleteField(e, index)}>Delete</Button>
            </div>
      </div>
   // </div>
  );
}