import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./NewClient.scss";
import Input from "../../component/input/Input";
import Axios from "axios";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import { Button, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';





export default function NewClient() {

    const [numberOfDocs, setNumberDoc] = useState(0);

    const [data, setData] = useState();

    const [newName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newDocs, setNewDocs] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newProgram, setNewProgram] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [newDocName, setNewDocName] = useState("");
    const [newDocDes, setNewDocDesc] = useState("");


  const programs = [
    {
      value: "Work Permit",
      label: "Work Permit",
    },
    {
      value: "Study Permit",
      label: " Study Permit",
    },
    {
      value: "Skilled Worker",
      label: " Skilled Worker",
    },
    {
      value: "Visitor Visa",
      label: "Visitor Visa",
    },
    {
      value: "Sponsorship",
      label: "Sponsorship",
    },
    {
      value: "Citizenship",
      label: "Citizenship",
    },
  ]


    useEffect(() => {
      Axios ({
         method: "GET",
        withCredentials: true,
          url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth/consultantLog",
   
       
        }).then((res) => {
         setData(res.data);       
        });
   }, []) 

   // console.log("console.log" + JSON.stringify(data.id))

    const newClient = async (e) => {
     e.preventDefault();
    
  
        console.log("I am in new client function now");
      
        try {
          await Axios ({
              method: "PUT",
              withCredentials: true,
              data: {
                  client_firstName: newName,
                  client_lastName: newLastName,
                  program: newProgram,
                  client_Username: newUsername,
                  client_Password: newPassword, 
                  client_Email: newEmail,
                  dateDeadline: newDate,
                  docNumber: numberOfDocs,
                  documents : newDocs
             /*      documents : [
                      {
                          docName: newDocs.[0].label
                      }
      
                  ] */
              },
               url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/update/" + data.id,
            timeout: 5000,
          })
          setAccepted(true);
         // window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }

      // Shit that handles the dynamic input of forms.

      // console.log("c'est un speed de merde" + data.id)
const [formValues, setFormValues] = useState([]);
const [toggle, setToggle] = useState(false);

const inputRef = useRef();
const inputRefDes = useRef();
const selectRef = useRef();



   const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };    

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      docName: inputRef.current.value || "label",
      docDescription: inputRefDes.current.value || "text",
      // value: "",
    });
    setFormValues(values);
    setToggle(false);
    setNumberDoc(numberOfDocs + 1);
    setNewDocs(values)
    console.log("these are the values" + JSON.stringify(values))
  };

  const handleDeleteField = (e, index) => {
    const values = [...formValues];
    values.splice(index, 1);
    setFormValues(values);
  };

  const addBtnClick = (e) => {
    e.preventDefault();
    setToggle(true);
  };

    return (

<div>

        <div className="home">
        <Sidebar/>
   

    <div className="homeContainer">
    <Navebar/>


    
  
    
    <form   onSubmit={newClient}>

    <div className="newContain">


    <div className="row-1">
   

  <div className="column1">

  <div className="firstName">
  <label >First Nameee</label>
<TextField id="outlined-basic"  size="small" type="text" placeholder="Enter Name" onChange={(e) => setNewFirstName(e.target.value)} required/> 
 </div>

 <div className="email">
<label> Email</label>
<TextField type="text" size="small" placeholder="Enter Email" onChange={(e) => setNewEmail(e.target.value)}/> 
</div>

</div>

<div className="column2">

<div className="lastName">
<label>Last Name</label>
<TextField size="small" type="text" placeholder="Enter Name" onChange={(e) => setNewLastName(e.target.value)}/> 
</div>

<div className="program">

<label> Program </label>
<TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your client's program"
          size="small"
        >
          {programs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>


{/* 
<select  onChange={(e) => setNewProgram(e.target.value)}>
          <option value="Visitor Visa">Select Value</option>
          <option value="Visitor Visa">Visitor Visa</option>
          <option value="Work Permit">Work Permit</option>
          <option value="Study Permit">Study Permit</option>
          <option value="Sponsorship">Sponsorship</option>
          <option value="Citizenship">Citizenship</option>
          <option value="Express Entry">Express Entry</option>
          <option value="Quebec Skilled Worker">Quebec Skilled Worker</option>
        </select>

 */}
</div>
</div>
</div>

<div className="row-2">


<label>Client Documents</label> 


    
    {!toggle ? (
      <div className="center">
        <Button variant="contained" className="add-btn" onClick={addBtnClick}>
          Add new
        </Button>
      </div>
    ) : (
      <div className="dialog-box">
         <TextField size="small" type="text" placeholder="Document Name" className="inputDoc" ref={inputRef} />
        <TextField id="outlined-multiline-static" multiline rows={4} className="desDoc" type="text" placeholder="Document Description"  cols={40} ref={inputRefDes}  /> 
        
        {/* <select ref={selectRef}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
        </select>  */}
        <Button variant="contained" className="mala" onClick={handleAddField}>
          Add
        </Button>
       
      </div>
     
    )}

</div>

<div className="row-2bis">


{formValues.map((obj, index) => (
      <Input
        key={index}
        objValue={obj}
        onChange={handleChange}
        index={index}
        deleteField={handleDeleteField}
      />
    ))}


</div>
  <div className="row-3bis">
  <label>Set up a deadline ?</label>

  </div>
   <div className="row-3">

    {/* <button type="submit" onSubmit={handleSubmit} className="submit-btn"> */}
    <Button variant="contained" type="submit" className="sub-btn">
      Submit
    </Button>
    
    </div>


{accepted ? <div className="success">Client created</div> : null}




</div>












{/* 
<label>Client Username</label>
<input type="text" placeholder="Enter Username" onChange={(e) => setNewUsername(e.target.value)}/>


<label>Client Password</label>
<input type="text" placeholder="Enter Password" onChange={(e) => setNewPassword(e.target.value)}/>




<label>Client Deadline</label>
<input type="text" placeholder="Enter Date Deadline" onChange={(e) => setNewDate(e.target.value)}/> 
 */}

{/* Here we make all the test for the document part */}


{/* <button type="submit" onClick={newClient}>Submit</button> */}

</form>



    
    </div>
    </div>
    

    
</div>
    )
    }


