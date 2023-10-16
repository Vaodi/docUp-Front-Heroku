import React, { useState, useRef } from "react";
import { useEffect } from "react";

import Input from "../../component/input/Input";
import Axios from "axios";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import { Button, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';





export default function NewForm() {

    const [numberOfDocs, setNumberDoc] = useState(0);

    const [data, setData] = useState();

    const [newName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newDocs, setNewDocs] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newProgram, setNewProgram] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [newDocName, setNewDocName] = useState("");
    const [newDocDes, setNewDocDesc] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [templateSelection, setTempSelec] = useState(false);
    const [template, setTemplate] = useState([]);
    const [ind, setInd] = useState("");


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
         setTemplate(res.data.docTemplates)
        });
   }, []) 

   

console.log("this is my dataaaa" + JSON.stringify(data))
console.log("this is my templates" + JSON.stringify(template))

    
    // console.log("this is my templates" + JSON.stringify(templates))

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
                  client_Username: username,
                  client_Password: password, 
                  client_Email: newEmail,
                  dateDeadline: newDate,
                  docNumber: numberOfDocs,
                  documents : newDocs,
                  noDeadline: isChecked
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
          console.log("boroubabbbaa" + JSON.stringify(formValues));
          console.log("newDocs" + JSON.stringify(newDocs));
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
      docName: newDocName || "label",
      docDescription: newDocDes || "text",
      // value: "",
    });
    setFormValues(values);
    setToggle(false);
    setNumberDoc(numberOfDocs + 1);
    setNewDocs(values)
    console.log("these are the values" + JSON.stringify(values))
   
  };

// ----------------------------------------------------------------------------------------------------------------

function calculateShortestScenario(newDate) {
    // Parse the user's birthday string into a Date object
    const birthday = new Date(newDate);
  
    // Get today's date
    const today = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // Scenario 1: Time since user is 18 years old
    const eighteenYearsAgo = new Date(birthday);
    eighteenYearsAgo.setFullYear(birthday.getFullYear() + 18);

            // to format the date
            const dateObj = new Date(eighteenYearsAgo);
            const date = dateObj.toLocaleString('en-CA', options);


    // Scenario 2: Last 10 years
    const tenYearsAgo = new Date(today);
    tenYearsAgo.setFullYear(today.getFullYear() - 10);

             // to format the date
             const dateObj10 = new Date(tenYearsAgo);
             const date10 = dateObj.toLocaleString('en-CA', options);
  
    // Calculate the time differences in milliseconds
    const timeDifferenceScenario1 = today - eighteenYearsAgo;
    const timeDifferenceScenario2 = today - tenYearsAgo;
  
    // Compare the time differences and return the shortest scenario
    if (timeDifferenceScenario1 < timeDifferenceScenario2) {
      return "le chemin le plus court est 18 ans, donc à compléter depuis : " + date;
    } else {
      return "le chemin le plus court est 10 last years" + date10;
    }
  }
  
  // Test the function with a user's birthday (YYYY-MM-DD format)
  const userBirthday = "1995-06-15";
  const shortestScenario = calculateShortestScenario(userBirthday);
  console.log("Shortest Scenario:", shortestScenario);
  


























// ----------------------------------------------------------------------------------------------------------------

  // -----------

  const handleAddFieldTemplate = (e) => {
    e.preventDefault();

        const selectedTemplateName = e.target.value;
        const selectedTemplate = template.find((option) => option.name === selectedTemplateName);
        const selectedDocuments = selectedTemplate.documents;
        console.log("selectedTemplateName" + selectedTemplateName)      
        console.log("selectedTemplate" + JSON.stringify(selectedTemplate))      
        console.log("selectedDocuments" + JSON.stringify(selectedDocuments))      


    const values = [...formValues];

    selectedDocuments.forEach((document) => {
      values.push({
        docName: document.name,
        docDescription: document.description,
      });
    });

    values.push({
      docName: newDocName || "label",
      docDescription: newDocDes || "text",
      // value: "",
    });
    setFormValues(values);
    setToggle(false);
    setNumberDoc(values.length);
    setNewDocs(values)
    console.log("these are the values" + JSON.stringify(values))
    console.log("these are NUMBER the values" + JSON.stringify(values.length))
  };

  // ------------

 /*  const handleDeleteField = (e, index) => {
    const values = [...formValues];
    console.log("these are the values from the fucking delete field" + JSON.stringify(values))
    values.splice(index, 1);
    setFormValues(values);
  }; */

  const handleDeleteField = (e, index) => {
    e.preventDefault();
    setInd(index)
    const values = [...formValues];
    values.splice(index, 1);
    setFormValues(values);
    setNumberDoc(numberOfDocs - 1)
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

    <div className="tonForm">

    <div className="ligne1">

  <div className="nomPrenom">
  <label className="stp" >New Form</label>

<TextField   size="small" type="text" placeholder="Enter Name" onChange={(e) => setNewFirstName(e.target.value)}
     style={{ marginLeft: '30px', boxSizing: 'border-box' }}
/> 


 </div>

 <div className="courriel">
<label> Email</label>
<TextField type="text" size="small" placeholder="Enter Email" onChange={(e) => setNewEmail(e.target.value)}
     style={{ marginLeft: '30px', boxSizing: 'border-box' }}
/> 
</div>

</div>








<div className="ligne2">

<div className="nomFamille">
<label>Last Name</label>
<TextField size="small" type="text" placeholder="Enter Name" onChange={(e) => setNewLastName(e.target.value)}
     style={{ marginLeft: '28px', boxSizing: 'border-box' }}
/> 
</div>

<div className="prog">

<label> Program </label>
<TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your client's program"
          size="small"
          style={{ marginLeft: '30px', boxSizing: 'border-box' }}
        >
          {programs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>



</div>

</div>

<div className="ligne2bis">
    
    <div className="nomFamille">
<label>Username</label>
<TextField size="small" type="text" placeholder="Enter Username" onChange={(e) => setUserName(e.target.value)}
     style={{ marginLeft: '28px', boxSizing: 'border-box' }}
/> 
</div>

<div className="password">
<label>Password</label>
<TextField size="small" type="text" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}
     style={{ marginLeft: '28px', boxSizing: 'border-box' }}
/> 
</div>



    </div>

<div className="ligne3">


<div>
<label>Select template</label>
<TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your template"
          size="small"
          style={{ marginLeft: '30px', boxSizing: 'border-box' }}
          onChange={handleAddFieldTemplate}
        >
          {template.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

</div>


    
    {!toggle ? (
      <div className="center">
      <label>Client Documents</label> 
        <Button variant="contained" className="add-new-doc" onClick={addBtnClick} style={{marginLeft:'30px'}}>
          Add new
        </Button>
      </div>
    ) : (
      <div className="enfer">
      <label>Client Documents</label> 
         <TextField size="small" type="text" placeholder="Document Name" className="inputDocName" onChange={(e) => setNewDocName(e.target.value)}  style={{ marginTop: '30px'}} />
        <TextField id="outlined-multiline-static" multiline rows={4} className="inputDocDes" type="text" onChange={(e) => setNewDocDesc(e.target.value)} placeholder="Document Description"  cols={40} ref={inputRefDes} 
        style={{ marginTop: '30px'}}
         /> 
        
        {/* <select ref={selectRef}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
        </select>  */}
        <Button variant="contained" className="submit-doc" onClick={handleAddField} style={{marginTop:'30px'}}>
          Add
        </Button>
       
      </div>
     
    )}

    </div>






<div className="realHell">

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

<div className="ligne3bis">
<label>Set up a deadline</label>
<TextField size="small" type="date" placeholder="Enter Deadline" onChange={(e) => setNewDate(e.target.value)}
      style={{ marginLeft: '30px', boxSizing: 'border-box' }} 
/>
<p>This is the date selected : {newDate}</p>
<p>tu dois justifier avec modèle : {calculateShortestScenario(newDate)}  </p>
<p>Please start justifying from date : {calculateShortestScenario(newDate)}  </p>
</div>

<div className="ligne4bis">
<label>Do not set up a deadline for now</label>
 {/* add a checkbox next line  */}
 <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />

</div>

 <div className="ligne4">

    {/* <button type="submit" onSubmit={handleSubmit} className="submit-btn"> */}
    <Button variant="contained" type="submit" className="sub-btn">
      Submit
    </Button>
    
    </div>
    


{accepted ? <div className="success">Client created</div> : null}
{accepted ? console.log("accepted" + JSON.stringify(newDocs)) : null}




</div>



</form>



    
    </div>
    </div>
    

    
</div>
    )
    }


