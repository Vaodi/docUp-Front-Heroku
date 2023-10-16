import React from "react";
import "./User.scss";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import UserDoc from "../../component/usersDoc/UsersDoc";
import { useParams } from "react-router-dom";
import Datatable from "../../component/datatable/Datatable";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import DocReview from "../../component/docReview/docReview";
import DocForEmail from "../../component/docForEmail/docForEmail";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chip from '@mui/material/Chip';



export default function User () {

    const [data, setData] = useState();
    const { id } = useParams()
    const [buttonText, setNewText] = useState("Edit name");
    const [toggle, setToggle] = useState(false);
    const [clientNewName, setNewName] = useState("");
    const [docNewName, setNewDocName] = useState("");
    const [docNewDes, setNewDocDes] = useState("");
    const [toggleNewDoc, setToggleNewDoc] = useState(false);
    const [buttonAddDoc, setNewTextAddDoc] = useState("Request a new document");
    const [newDeadline, setNewDeadline] = useState("");
    const [displayDeadline, setToggleNewdeadline] = useState(false);
    const [value, setValue] = useState("");



const theme = createTheme({
 
  palette: {
    primary: {
      main: '#42db00',
      darker: '#6e2aad',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

    useEffect(() => {
        Axios ({
           method: "GET",
          withCredentials: true,
          url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",
     
         
          }).then((res) => {
           setData(res.data);
           console.log("my userssss" + JSON.stringify(res.data.clients));
          
           
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
        if (toggleNewDoc) setNewTextAddDoc("Add a document");
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
              
              // url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/name/" + data.clients[clientIndice]._id ,
               url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/name/" + data._id ,
            
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
                 client_id: data._id,
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


      const newDeadLine = async () => {
        console.log('je new dead ca')
        try {
          console.log('this is the date' + value)
          await Axios ({
              method: "PUT",
              withCredentials: true,
              data: {
                 client_id: data._id,
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
                clientEmail : data.client_Email,
                clientName : data.client_name,
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

    function displayDocuments(doc) {
      return <DocReview 
          name={doc.name}
          rid={doc._id}
          description={doc.description}
          path={doc.doc_upload}
          userID={id}
          status={doc.status}
          review={doc.review}
          reason={doc.reason}
      />
  }

  function displayDocumentsForEmail(doc) {
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
   
    if (data === undefined) {

        return (<>Still loading...</>)
    }
    
    if (!data){
        return 
        <h1>Not allowed</h1>
        
    } 

    if (data){

        // when we have data, we need to find the client that matches the id
    // for (let i = 0; i < data.clients.length; i++) {
      //  if (data.clients[i]._id === id) {
            // when we find the client, we need to store the indice of the client in the array
        //    console.log("this is the clients " + JSON.stringify(data.clients[i]))
            // which then become the clientIndice i that we can use to render HTML
          //  var clientIndice = i;
     
        // }
     // }

   // console.log("this is the datasadkLSJFJKFSFAJfkasfjk" + JSON.stringify(data.clients[clientIndice].documents.name))


    return (
        <div>

        
         

            <div className="home">
            <Sidebar/>
       

        <div className="homeContainer">
        <Navebar/>
        
        <div className="clientContainer">

      
             {/* <h1> {data.clients[clientIndice].client_firstName}  {data.clients[clientIndice].client_lastName}</h1> */}
          

            </div>

          <div className="buttonContainer">
            <Button variant="contained" onClick={showNewdoc}> {buttonAddDoc} </Button>
            <Button size="small" color="secondary" onClick={showUpdate}> {buttonText}</Button>
          </div>


      <div className="listContainer">
      
    
   {/*    {data.clients[clientIndice].documents.map(displayDocuments)}  */}
      {data.documents.map(displayDocuments)} 

        </div>

     <div className="email2">

  

        {/* 

           <div className="email-section">
           <h3 className="titleForEmail">{data.clients[clientIndice].dateDeadline ? (
     <p>Here's the email that will be sent on {data.clients[clientIndice].dateDeadline.substring(0, 10)} </p>) : (<p>Here's the email that will be sent when you are going to set up a deadline </p>)}
     </h3>
           <div className="emailTemplate">
        
        
       
     
    <p>Dear {data.clients[clientIndice].client_name},</p>

    <p>As you know, we are working on your project. We are currently waiting for the following documents:</p>
    <p>{data.clients[clientIndice].documents.map(displayDocumentsForEmail)}</p>
    {data.clients[clientIndice].dateDeadline ? (
    <p>Could you please send them to us before the {data.clients[clientIndice].dateDeadline.substring(0, 10)} </p> ): (
      <p>Could you please send them to us as soon as possible?</p>
    )}

    <p>Thank you for your understanding.</p>
    <p>Best regards,</p> 

         </div>
         </div> */}


        
         



        </div>

        <div className="deadlineContainer">

         
{/* 
<form >

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
 </div>

        </div>
        </div>
     
  
            
            {toggleNewDoc ? (
                <form onSubmit={addDocument}>
                <div>
                <label>New doc's name</label>
                <input type="text" onChange={(e) => setNewDocName(e.target.value)} />
                <label>New doc's description</label>
                <input type="text" onChange={(e) => setNewDocDes(e.target.value)} />
                <button type="submit"> Update</button>
                </div>
                </form>
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
    )
    }
}
