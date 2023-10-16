import React from "react";
import "./FakeIndi.scss"
import Datatable from "../../component/datatable/Datatable";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import UserDoc from "../../component/usersDoc/UsersDoc";
import { useParams } from "react-router-dom";
import TableDoc from "../../component/TableDoc/TableDoc";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import DocReview from "../../component/docReview/docReview";
import DocForEmail from "../../component/docForEmail/docForEmail";
import WrongDocs from "../../component/wrongDocs/wrongDocs";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormClientTable from '../../component/formClientTable/formClientTable'
import FormToComplete from '../../component/formToComplete/formToComplete'

import PDFFile from '../../component/pdfFile/PdfFile.js';
import { PDFDownloadLink } from "@react-pdf/renderer";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//shit about tabs 

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Fake () {

    const [data, setData] = useState();
    const { id } = useParams()
    const [buttonText, setNewText] = useState("Edit name");
    const [toggle, setToggle] = useState(false);
    const [clientNewName, setNewName] = useState("");
    const [docNewName, setNewDocName] = useState("");
    const [docNewDes, setNewDocDes] = useState("");
    const [toggleNewDoc, setToggleNewDoc] = useState(false);
    const [buttonAddDoc, setNewTextAddDoc] = useState("Demander un autre document");
    const [newDeadline, setNewDeadline] = useState("");
    const [displayDeadline, setToggleNewdeadline] = useState(false);
   // const [value, setValue] = useState("");

   const [allFormsCompleted, setAllFormsCompleted] = useState(false);
   const [selectedDate, setSelectedDate] = useState(null);
   

   const handleDateChange = (date) => {
    setSelectedDate(date); // Save the selected date in the state variable
  };

var li = 0;

// shit about tab display 

const [value, setValue] = React.useState(0);
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleStatusChange = async () => {
  try {
      
    await Axios ({
        method: "PUT",
        withCredentials: true,
        data: {
          client_id: data.clients[clientIndice]._id, 
        },
        
         url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/statusChange/" 
      
    })
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

const changeDeadline = async () => {
  try {

    const today = new Date();
    const selectedDateObject = new Date(selectedDate);
    if (selectedDateObject < today) {
      // Display an alert if selectedDate is smaller
      alert("Merci de sélectionner une date postérieur à aujourd'hui");
      return; // Exit the function without making the Axios request
    }


    await Axios ({
        method: "PUT",
        withCredentials: true,
        data: {
          newDate: selectedDate, 
          client_id: data.clients[clientIndice]._id, 
          status: data.clients[clientIndice].fileStatus
        },
        
         url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deadlineChange/" 
      
    })
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}






    useEffect(() => {
        Axios ({
           method: "GET",
          withCredentials: true,
          url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",
     
         
          }).then((res) => {
           setData(res.data);
           console.log("legolas" + JSON.stringify(res.data.clients));
          
           
          });
     }, []) 

     const showUpdate = (e) => {
        e.preventDefault();
        setToggle(!toggle);
        if (toggle) setNewText("Edit name");
        else  
        setNewText("Hide edit");
      };

      const showNewdoc = (e) => {
        e.preventDefault();
        setToggleNewDoc(!toggleNewDoc);
        if (toggleNewDoc) setNewTextAddDoc("Demander un autre document");
        else  
        setNewTextAddDoc("Hide");
      };

      const showDeadline = (e) => {
        e.preventDefault();
        setToggleNewdeadline(!displayDeadline);
      };


  

      // function to update the client name
      const updateClient = async () => {
        try {
      
          await Axios ({
              method: "PUT",
              withCredentials: true,
              data: {
                  client_name: clientNewName, 
              },
              
               url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/name/" + data.clients[clientIndice]._id ,
            
          })
      
        } catch (error) {
          console.log(error);
        }
      }

      // to do : replace the strings here by the value. In this case, you need to use useState to store the value of the input. Also need to toogle the update input if cliked.

      const addDocument = async () => {
        try {
      
          await Axios ({
              method: "POST",
              withCredentials: true,
              data: {
                 client_id: data.clients[clientIndice]._id,
                  doc_name : docNewName,
                  doc_description: docNewDes,
              },
              
               url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/addDoc" ,
            
          })

          window.location.reload();
      
        } catch (error) {
          console.log(error);
        }
      }


      // create a function to update the fileStatus of the client:

      const updateFileStatus = async () => {
        try {
          await Axios ({
            method: "PUT",
            withCredentials: true,
            data: {
               client_id: data.clients[clientIndice]._id,
               //newDeadline: newDeadline,
               
            },
            
             url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/ChangeStatusIfOnlyForms" ,
          
        })

         window.location.reload();
    
      } catch (error) {
        console.log(error);
      }
    }










      const newDeadLine = async () => {
        console.log('je new dead ca')
        try {
          console.log('this is the date' + value)
          await Axios ({
              method: "PUT",
              withCredentials: true,
              data: {
                 client_id: data.clients[clientIndice]._id,
                 //newDeadline: newDeadline,
                 newDeadline: value,
              },
              
               url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/newDeadline" ,
            
          })

          // window.location.reload();
      
        } catch (error) {
          console.log(error);
        }
      }
      

      const sendEmail = async () => {
        console.log("11 - I am trying to send an email")

        try {
          console.log("12 trying to send an email")


          await Axios ({
              method: "POST",
              withCredentials: true,
              data: {
                clientEmail : data.clients[clientIndice].client_Email,
                clientName : data.clients[clientIndice].client_name,
                consultantEmail : data.email,
              },

                url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/users/sendEmail" ,

          })

          // window.location.reload();

        } catch (error) {
          console.log(error);
        }
      }


     function createDocuments(doc) {
        return <UserDoc
            name={doc.name}
            rid={doc._id}
            path={doc.doc_upload}
            userID={id}
            status={doc.status}
            review={doc.review}
            reason={doc.reason}
        />
    }

    function displayDocumentsWrong(doc) {
      {console.log("999999" + JSON.stringify(doc))}
     // const reasonArray = doc.reason.map((item) => ({ reason: item.title }));
      return <WrongDocs
     
          name={doc.name}
         // rid={doc._id.toString()}
          description={doc.description}
         // path={doc.doc_upload}
          // userID={id}
          status={doc.status}
          review={doc.review}
          reason={doc.reason}
      />
  } 

  function displayDocumentsMissing(doc) {
    return <DocForEmail
        name={doc.name}
        description={doc.description}
        status={doc.status}
        review={doc.review}
        reason={doc.reason}
    />
} 

    console.log("this is the id of who the client" + id)
    console.log("this is the data ?" + JSON.stringify(data))
    //console.log("this is the client ?" + JSON.stringify(data.clients[clientIndice]))
   

    if (data === undefined) {

        return (<>Still loading...</>)
    }
    
    if (!data){
        return 
        <h1>Not allowed</h1>
        
    } 

    if (data){


        // when we have data, we need to find the client that matches the id
     for (let i = 0; i < data.clients.length; i++) {
        if (data.clients[i]._id === id) {
            // when we find the client, we need to store the indice of the client in the array
            console.log("this is the clients " + JSON.stringify(data.clients[i]))
            // which then become the clientIndice i that we can use to render HTML
            var clientIndice = i;
     
        }
    }

    console.log("this is the datasadkLSJFJKFSFAJfkasfjk" + JSON.stringify(data.clients[clientIndice]))


    


    let statusClassName = "status"

    if (data.clients[clientIndice].fileStatus === "uncomplete") {
      statusClassName = "uncomplete";
    } else if (data.clients[clientIndice].fileStatus === "complete") {
      statusClassName = "complete";
    } else if (data.clients[clientIndice].fileStatus === "client to notify") {
      statusClassName = "toNotify";
    }
    else if (data.clients[clientIndice].fileStatus=== "to review") {
      statusClassName = "toRev";
    }
    else if (data.clients[clientIndice].fileStatus=== "late") {
      statusClassName = "lateStatus";
    }

    return (
        <div>

        
         

            <div className="home">
            <Sidebar/>
       

        <div className="homeContainer">
        <Navebar/>
        
        <div className="clientContainer">

       
      <div className="nameStatus">
      
             <h1> {data.clients[clientIndice].client_firstName}  {data.clients[clientIndice].client_lastName}</h1>

             <p  className={statusClassName}>{data.clients[clientIndice].fileStatus}</p>
      </div>
             
             <div>

<Box sx={{ width: '100%' , marginTop:'1%'}}>
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
  <Tab label="Document" {...a11yProps(0)} />
  <Tab label="Formulaire" {...a11yProps(1)} />
  <Tab label="Information" {...a11yProps(2)} />
</Tabs>
</Box>
<CustomTabPanel value={value} index={0}>

<div >
            <Button variant="outlined" size='small' onClick={showNewdoc}> {buttonAddDoc} </Button>
            
         
         
          </div>

          {data.clients[clientIndice].fileStatus === 'client to notify' ?
        <div>
        <Button style={{ marginLeft: '65%' }} variant="contained"  color="success" size='small' onClick={handleClickOpen} >Notify client</Button> 
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attention"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Le client a bien été notifié de ses erreurs ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Non</Button>
          <Button onClick={handleStatusChange} autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
        </div>
          : null
          }



          <div className="addDoc">

          {toggleNewDoc ? (
            <div className="addDocForm">
                <form onSubmit={addDocument}>
            
                <label>Nom du document</label>
                <input className="addDocFormInput" type="text" onChange={(e) => setNewDocName(e.target.value)} />
               
               
                <label className="LabelInput">Description du document</label>
                <input  className="addDocFormInput" type="text" onChange={(e) => setNewDocDes(e.target.value)} />
               
               
                <Button  variant="contained"  size="small" className="LabelInput" type="submit"> Valider</Button>
             
                </form>
                </div>
                ) : null}

            {toggle ? (
                <form onSubmit={updateClient}>
                <div>
                <label>New client's name</label>
                <input type="text" onChange={(e) => setNewName(e.target.value)} />
                <button type="submit"> Update</button>
                </div>
                </form>
                ) : null}

          </div>

<TableDoc 
              clients={data.clients[clientIndice].documents}
              rid={data.id}
              getRowId={(row) => row.data.clients._id}
              ridi={data.clients[clientIndice]._id}
           
        />




          <div className="email2">

  

        

<div className="email-section">
<h3 className="titleForEmail"> The review
</h3>
<div className="emailTemplate">






Voilà les documents manquants :
<p> {data.clients[clientIndice].documents.map(displayDocumentsMissing)}</p>
<div className="docRevoir">
Voilà les documents à revoir :
<p>{data.clients[clientIndice].documents.map(displayDocumentsWrong)}</p>  
</div>


</div>
</div>







</div>


</CustomTabPanel>
<CustomTabPanel value={value} index={1}>

{ Array.isArray(data.clients[clientIndice].documents) && data.clients[clientIndice].documents.length === 0  && data.clients[clientIndice].formStatus ==='complete' ? <Button variant="outlined" size='small' onClick={updateFileStatus}>Les formulaires sont bons</Button> :null}



<FormToComplete
              clients={data.clients[clientIndice].forToComplete}
              data={data}
              clientIndice={clientIndice}

              // rid={data.id}
              // getRowId={(row) => row.data.clients._id}
              // ridi={data.clients[clientIndice]._id}
      /> 
</CustomTabPanel>
<CustomTabPanel value={value} index={2}>

Information du client:

<span className="infoColumn">

<div className="infoColumnSpacing">
Prénom : {data.clients[clientIndice].client_firstName}
</div>
<div className="infoColumnSpacing">
Nom : {data.clients[clientIndice].client_lastName}
</div>
<div className="infoColumnSpacing">
Username : {data.clients[clientIndice].client_Username}
</div>
<div className="infoColumnSpacing">
Pasword : {data.clients[clientIndice].client_Password}
</div>
<div className="infoColumnSpacing">
Programme : {data.clients[clientIndice].program}
</div>
<div className="infoColumnSpacing">
E-mail : {data.clients[clientIndice].client_Email}
</div>
<div className="infoColumnSpacing display">

<div>
Deadline : {(data.clients[clientIndice].dateDeadline).substring(0, 10)}

</div>

<div>



<form className='formDate' onSubmit={changeDeadline}>




  Modifier votre deadline: 


<div>


  <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DatePicker
      style={{marginLeft:'45%'}}
      value={selectedDate} onChange={handleDateChange}
      format="DD/MM/YYYY" 
       />
    </LocalizationProvider>





<Button type="submit">Enregistrer</Button>
</div>
</form>
</div>

</div>
<div className="infoColumnSpacing">




</div>

</span>

</CustomTabPanel>
</Box>

</div>
          

            </div>

       

          

      

     


      
     
    
      {/* {data.clients[clientIndice].documents.map(displayDocuments)}  */}

        </div>

    

        {/* <div className="deadlineContainer"> */}

         

{/* <form >

  <Button  
 variant="outlined"
onClick={showDeadline}>Set up new deadline</Button>

 
   <Button 
   variant="outlined"
   sx={
    {
      marginLeft: '15px',
   }
  }
    onClick={sendEmail}>Send Email now </Button>

     {displayDeadline ? (
      <form onClick={newDeadLine}>
      <div className="monster">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
      </LocalizationProvider>
      <Button 
      sx={
        {
          marginLeft: '15px',
      }
      }
      variant="contained" type="submit"> Update deadline</Button>
      </div>
      </form>
      ) : null}
 </form> */}
 {/* </div> */}

      
        </div>
     
  
            
  

   
           
    
        </div>
    )
    }
}