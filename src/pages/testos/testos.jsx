import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./testos.scss";
import Input from "../../component/input/Input";
import Axios from "axios";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import { Button, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




export default function NewClient() {

    const [numberOfDocs, setNumberDoc] = useState(0);

    const [data, setData] = useState();

    const [newName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("aa");
    const [newDocs, setNewDocs] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDate, setNewDate] = useState("");

    const [accepted, setAccepted] = useState(false);
    const [newDocName, setNewDocName] = useState("");
    const [program, setProgram] = useState("");
  
    const [newDocDes, setNewDocDesc] = useState("");
    const [username, setUserName] = useState("");

    const [usernameBTN, setUserNameBTN] = useState("");
    const [passwordBTN, setPasswordBTN] = useState("");

    const [errorMessage, setErrorMessage] = useState(false);
    const [validationError, setValidationError] = useState(false);

    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [templateSelection, setTempSelec] = useState(false);
    const [template, setTemplate] = useState([]);
    const [allForms, setAllForms] = useState([]);
    const [ind, setInd] = useState(0);
    const [selectedForms, setSelectedForms] = useState([]);

    const [selectedForm, setSelectedForm] = useState("");
    const [formulaireValues, setFormulaireValues] = useState([]);

    const handleSelectedForm = (e) => {
      e.preventDefault();
      console.log("I am in handleSeclectedForm function now");
      
      setSelectedForm(e.target.value);
      console.log("selectedForm" + JSON.stringify(selectedForm))
     
    };


    // for green pop up

    const [open, setOpen] = React.useState(false);
    
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    // end for green pop up

    const handleAddForm = (e) => {
      console.log("I am in handleAddForm function now");
      e.preventDefault();

      const selectedFormName = selectedForm;
      const selectedFormInFunction = allForms.find((option) => option.name === selectedForm);
     // const selectedFormLink = selectedForm;
      console.log("selectedFormName" + selectedFormName)
      console.log("selectedIn function " + JSON.stringify(selectedFormInFunction))

      const val = [...selectedForms];

     
        val.push({
          name: selectedFormInFunction.name,
          link: selectedFormInFunction.link,
          status:"uncomplete"
          }) ;

    setSelectedForms(val)
    console.log("selectedForms Final " + JSON.stringify(selectedForms))
    }

    console.log("selectedForms Final " + JSON.stringify(selectedForms))


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
    {
      value: "Other",
      label: "Other",
    }
  ]


    useEffect(() => {
      Axios ({
         method: "GET",
        withCredentials: true,
          url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth/consultantLog",
   
       
        }).then((res) => {
         setData(res.data);       
         setTemplate(res.data.docTemplates)
         setAllForms(res.data.allForms)
        });
   }, []) 


   

console.log("this is my dataaaa" + JSON.stringify(data))
console.log("this is my templates" + JSON.stringify(template))
console.log("this is my Allforms" + JSON.stringify(allForms))

    
    // console.log("this is my templates" + JSON.stringify(templates))

   // console.log("console.log" + JSON.stringify(data.id))

    const newClient = async (e) => {
     e.preventDefault();
    

        if (!usernameBTN || !passwordBTN) {
      
       setValidationError(true)
  
          return; // Exit the function
        }
      
        setValidationError(false)
        try {
          await Axios ({
              method: "PUT",
              withCredentials: true,
              data: {
                  client_firstName: newName,
                  client_lastName: newLastName,
                  program: program,
                  client_Username: usernameBTN,
                  client_Password: passwordBTN, 
                  client_Email: newEmail,
                  dateDeadline: newDate,
                  docNumber: numberOfDocs,
                  documents : newDocs,
                  noDeadline: isChecked,
                  forToComplete: selectedForms,

                  // Cette partie sera à ajouter dans la page AnnexeA/:id (par exemple) qui est la page qui montre le questionnaire
                  // Annexe A. Dans formToComp Schema, tu ajoutes les forms que client doit compléter. Then display ces forms dans le 
                  // tableau. Dans "view", il va aller dans la page AnnexeA/:id. Donc ce modèle suppose un form = une page. 
                 
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
          handleClick();
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

/*     values.push({
      docName: newDocName || "label",
      docDescription: newDocDes || "text",
      // value: "",
    }); */
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

  const generateUsername = async () => {

    if (newLastName === 'aa') {
      setErrorMessage(true);
      return
    }

    if (newLastName.length < 2) {
      throw new Error('Last name must have at least two characters');
    }

    setErrorMessage(false);
    const firstTwoLetters = newLastName.slice(0, 2);

    const randomNumbers = Math.floor(Math.random() * 900) + 100;
  
   
    const username = `${firstTwoLetters}${randomNumbers}`;
  

        setUserNameBTN(username);
     
  };
  const generatePassword = async () => {

    const length = 6;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

setPasswordBTN(password)
     
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
  <label className="stp" >First Name</label>

<TextField   required size="small" type="text" placeholder="Enter Name" onChange={(e) => setNewFirstName(e.target.value)}
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
<TextField required size="small" type="text" placeholder="Enter Name" onChange={(e) => setNewLastName(e.target.value)}
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
          onChange={(e) => setProgram(e.target.value)}
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
<Button style={{'marginLeft' : '25px'}}variant='outlined' size='small' onClick={generateUsername}>Generate Username</Button>
{errorMessage ? <p style={{ color: 'red' }}>Please input last name first</p> : null}
{usernameBTN ? <p style={{'marginTop' : '15px'}} >Username : {usernameBTN}</p> : null}
{/* <TextField size="small" type="text" placeholder="Enter Username" onChange={(e) => setUserName(e.target.value)}
     style={{ marginLeft: '28px', boxSizing: 'border-box' }}
/>  */}
</div>

<div className="password">
<label>Password</label>
<Button style={{'marginLeft' : '25px'}}variant='outlined' size='small' onClick={generatePassword}>Generate Password</Button>
{passwordBTN ? <p style={{'marginTop' : '15px'}}>Mot de passe : {passwordBTN}</p> : null}
{/* <TextField size="small" type="text" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}
     style={{ marginLeft: '28px', boxSizing: 'border-box' }}
/>  */}
</div>



    </div>

<div className="ligne3">


<div>
<label className="smallMarginTop">Select template</label>
<TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your template"
          size="small"
          style={{ marginTop: '20px',marginLeft: '30px', boxSizing: 'border-box' }}
          onChange={handleAddFieldTemplate}

        >
          {template.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
       
  
</div>






{/* selection for the all forms */}
{

 }

    
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

<div className="smallMarginTop">
<label>Select forms</label>
<TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select the forms for your client"
          size="small"
          style={{ marginLeft: '30px', boxSizing: 'border-box' }}
          onChange={handleSelectedForm}
        >
          {allForms.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          onClick={handleAddForm}
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
        >
          Add Form
        </Button>
        <div>
        <h4 className="smallMarginTop">Selected Forms:</h4>
        <ul>
          {selectedForms.map((form, index) => (
            <li key={index}>
              {form.name} 
            </li>
          ))}
        </ul>
      </div>
    

</div>

<div className="ligne3bis smallMarginTop">
<label>Set up a deadline</label>
<TextField required size="small" type="date" placeholder="Enter Deadline" onChange={(e) => setNewDate(e.target.value)}
      style={{ marginLeft: '30px', boxSizing: 'border-box' }} 
/>
</div>

{/* <div className="ligne4bis">
<label>Do not set up a deadline for now</label> */}
 {/* add a checkbox next line  */}
{/*  <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />

</div> */}

 <div className="ligne4">

    {/* <button type="submit" onSubmit={handleSubmit} className="submit-btn"> */}
    <Button variant="contained" type="submit" className="sub-btn">
      Create client
    </Button>
    
    {
          validationError ?
      <p>

         Erreur : merci de d'abord générer un 'username' et 'password'
      </p>
   
       : null }
    </div>


    
    
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Client crée avec succès !
        </Alert>
   
      </Snackbar>
      </Stack>


{accepted ? console.log("accepted" + JSON.stringify(newDocs)) : null}




</div>



</form>



    
    </div>
    </div>
    

    
</div>
    )
    }


