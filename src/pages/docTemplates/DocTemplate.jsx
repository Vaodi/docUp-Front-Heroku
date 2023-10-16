// Desc: This is the page for the docTemplate
import * as React from 'react';
import './DocTemplate.scss'
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import { useEffect } from "react";
import Axios from "axios";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import Input from "../../component/input/Input";


//Successful alert 
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//



export default function DocTemplate() {
    const [data, setData] = useState();
    const [templateName, setNewTempName] = useState("");
    const [formValues, setFormValues] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [numberOfDocs, setNumberDoc] = useState(0);
    const [newDocs, setNewDocs] = useState("");

    const [inputDoc, setInputDoc] = useState("");
    const [desDoc, setDesDoc] = useState("");

    useEffect(() => {
        Axios ({
           method: "GET",
          withCredentials: true,
            url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth/consultantLog",
     
         
          }).then((res) => {
           setData(res.data);       
          });
     }, []) 


     // Sucessful submit alert 

     const [open, setOpen] = React.useState(false);

     const handleClick = () => {
       setOpen(true);
     };
   
     const handleClose = (event, reason) => {
       if (reason === 'clickaway') {
         return;
       }
   
       setOpen(false);
     };

  
     // end sucessful submit alert 
  

    const newTemplate = async (e) => {
        e.preventDefault();

           try {
             await Axios ({
                 method: "PUT",
                 withCredentials: true,
                 data: {
                     name: templateName,
                     
                     
                     docNumber: numberOfDocs,
                     documents : newDocs
                /*      documents : [
                         {
                             docName: newDocs.[0].label
                         }
         
                     ] */
                 },
                  url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/update/newTemp/" + data.id ,
               timeout: 5000,
             })
             //setAccepted(true);
             successfulSubmit()

             setTimeout(() => {
              window.location.reload();
            }, 2000);
           } catch (error) {
             console.log(error);
           }
         }


    const successfulSubmit = () => {
      setOpen(true)
    }

    const handleChange = (e, index) => {
        const values = [...formValues];
        values[index].value = e.target.value;
        setFormValues(values);
      };    
    
      const handleAddField = (e) => {
         e.preventDefault();
        const values = [...formValues];
        console.log("iiii" + inputDoc + desDoc)
        values.push({
          docName: inputDoc|| "",
          docDescription: desDoc || "",
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
        <div className="home">
        <Sidebar/>
   

    <div className="homeContainer">
    <Navebar/>
        <div>
        <h1 style={{marginLeft: '4%', marginTop: '4%'}} >Create document template</h1>
<form onSubmit={newTemplate}>

<div className='templateForm'>




<div style={{marginTop: '4%'}}>
        <label >Nom du template : </label>
<TextField  required style={{marginLeft: '4%'}} id="outlined-basic"  size="small" type="text" placeholder="Enter Name" onChange={(e) => setNewTempName(e.target.value)}/> 
 </div>



    
{!toggle ? (
  

  <div className="addNewBtnTemplate">
  <div style={{marginTop: '4%'}}>
 <label  >Document du client : </label> 


    <Button style={{marginLeft: '4%'}} variant="contained"  onClick={addBtnClick}>
     Ajouter document
    </Button>
    </div>
  </div>
) : (
  <div className="addNewBtnTemplate">
     <TextField required size="small" type="text" placeholder="Document Name" className="inputDoc" onChange={(e) => setInputDoc(e.target.value)} />
    <TextField style={{marginLeft: '1%', width:'50%'}} id="outlined-multiline-static" multiline rows={4} className="desDoc" type="text" placeholder="Document Description"  onChange={(e) => setDesDoc(e.target.value)}  /> 
    
    {/* <select ref={selectRef}>
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="email">Email</option>
      <option value="password">Password</option>
    </select>  */}
    <Button style={{marginLeft: '4%', width:'10%'}} variant="contained" className="mala" onClick={handleAddField}>
      Ajouter
    </Button>
   
  </div>
 
)}

{formValues.map((obj, index) => (
      <Input
        key={index}
        objValue={obj}
        onChange={handleChange}
        index={index}
        deleteField={handleDeleteField}
      />
    ))}



 <Button style={{marginTop: '2%'}} className='submitTemplate' variant="contained" type="submit" >
      Submit
    </Button>


</div>

</form>

        </div>
        </div>
       
  
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Template créer avec succès !
        </Alert>
      </Snackbar>
   
  
        </div>

        
    )
}