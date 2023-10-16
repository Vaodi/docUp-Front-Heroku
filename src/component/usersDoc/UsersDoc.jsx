import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";



export default function UsersDoc (props) {

  const [toggle, setToggle] = useState(false);
  const [docNewName, setNewName] = useState("");
  const [buttonText, setNewText] = useState("Edit");
  const [reasonClick, setReasonClick] = useState(false);
  const [reason, setNewReason] = useState("");
 

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    
  }

  
  const updateClient = async () => {
    try {
  
      await Axios ({
          method: "PUT",
          withCredentials: true,
          data: {
              doc_id: props.rid,
              doc_name: docNewName,
           
            
          },
          
           url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/docName/" + props.userID ,
        
      })
  
    } catch (error) {
      console.log(error);
    }
  }

  const docReviewYes = async () => {
    try {
      await Axios ({
          method: "PUT",
          withCredentials: true,
          data: {
              doc_id: props.rid,
              client_id: props.userID,
              review: "good"
          },
          url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/review"  ,
        })
    } catch (error) {
      console.log(error);
    }
  }

  const docReviewNo = async () => {
    try {
      await Axios ({
          method: "PUT",
          withCredentials: true,
          data: {
              doc_id: props.rid,
              client_id: props.userID,
              review: "bad"
          },
          url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/review"  ,
        });
        setReasonClick(true);
    } catch (error) {
      console.log(error);
    }
  }


  const deleteDocument = async () => {
    try {
  
      await Axios ({
          method: "DELETE",
          withCredentials: true,
          data: {
              doc_id: props.rid,
              client_id: props.userID,
           
            
          },
          
           url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deleteDoc"  ,
        
      })
      window.location.reload();
  
    } catch (error) {
      console.log(error);
    }
  }

  const updateReason = async () => {
    try {
      await Axios ({
        method: "PUT",
        withCredentials: true,
        data: {
            doc_id: props.rid,
            client_id: props.userID,
            reason: reason
        },
        
         url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/reason"  ,
      
    })
    } catch (error) {
      console.log(error);
    }
  }

  

  const fetchDocument = () => {

  fetch('https://docup-backend-d5e8d90cd77f.herokuapp.com/documents/'+ props.path, {
    headers: headers
  })
    .then(res => res.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "your-file");
      document.body.appendChild(link);
      link.click();
    })}


 


  const showUpdate = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    if (toggle) setNewText("Edit");
    else  
    setNewText("Hide");
  };


    return (
      <div className="header">

        


       <p>{props.name}</p>
        <p>{props.rid}</p>
        <p>{props.status}</p>
        <img src={'https://docup-backend-d5e8d90cd77f.herokuapp.com/documents/'+ props.path } />
        <button onClick={fetchDocument}> Download</button>
        {  props.status === "uploaded" ? <button onClick={docReviewYes} > Accept</button>  : null}
        {  props.status === "uploaded" ? <button onClick={docReviewNo} > Refuse</button>  : null}
        
        <form onSubmit={updateReason}>

       

        {  props.review === "bad" && reasonClick  ? <label>reason</label>  : null}
        {  props.review === "bad" && reasonClick  ? <input type="text" placeholder="reason" onChange={(e) => setNewReason(e.target.value)} />  : null}
        {  props.review === "bad" && reasonClick  ? <button type="submit"> Submit </button> : null}
        
        </form>

        {  props.review === "good"  ? <p> You have flagged this document as good </p>  : null}
        {  props.review === "bad"  ? <p> You have flagged this document as bad </p>  : null}
        {  props.review === "bad"  && props.reason ? <p> Reason : {props.reason}  </p>  : null}

        <button onClick={showUpdate}> {buttonText}</button>
        <button  onClick={deleteDocument}> Delete</button>

          <form onSubmit={updateClient}>
          
        {toggle ? (
          <div>
          <label>New doc's name</label>
          <input type="text" onChange={(e) => setNewName(e.target.value)} />
          <button type="submit"> Update</button>
       
          </div>
        ) : null}
          </form>
        
         
       
      </div>
    );
  }