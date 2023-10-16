import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import Documents from '../../component/document/Document'
import Clients from '../../component/client/Client'
import Input from "../../component/input/Input";
import Notifications from "../../component/notification/Notification";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import "./Homepage.scss"
import Table from "../../component/table/Table";
import Datatable from "../../component/datatable/Datatable";
import Alert from '@mui/material/Alert';

import MUIDataTable from "mui-datatables";
import { useMemo } from "react";

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { TextField } from '@mui/material';




export default function HomepageCons() {

 

  const columns3 = ["Name", "Company", "City", "State"];

  const data3 = [
   ["Joe James", "Test Corp", "Yonkers", "NY"],
   ["John Walsh", "Test Corp", "Hartford", "CT"],
   ["Bob Herm", "Test Corp", "Tampa", "FL"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
  ];
  
  const options = {
    filterType: 'checkbox',
  };

    const [numberOfDocs, setNumberDoc] = useState(0);

    const [data, setData] = useState();

    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newDocs, setNewDocs] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDate, setNewDate] = useState("");


    
  

useEffect(() => {
    Axios ({
       method: "GET",
      withCredentials: true,
        url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth/consultantLog",
 
     
      }).then((res) => {
       setData(res.data);       
      });
 }, []) 

 const newClient = async () => {
  
  console.log("I am in new client function now");

  try {
    await Axios ({
        method: "PUT",
        withCredentials: true,
        data: {
            client_name: newName,
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
      
    })
  } catch (error) {
    console.log(error);
  }
}

   




function createClients(client) {
    return <Clients 
        name={client.client_name}
        rid={client._id}
    />
} 

function createNotif(notif) {
    return <Notifications 
        message={notif.message}
        rid={notif._id}
        date={notif.date}
        closed={notif.closed}
    />
}





  // This is the handleSubmit, I console loged what you see but you can see that it returns an array of whatever dynamic input you have, so you can use it to send it to the backend.



  /* console.log(
    "CHouf a zabi" + 
    JSON.stringify(formValues.map((val) => {
      return { [val.label]: val.value };
    })
  ) + numberOfDocs + "newDocs" + JSON.stringify(newDocs)); */

  // console.log("waaaa si l'haj" + JSON.stringify(newDocs[0].label))
  
  

  // This is the end of the handleSubmit part, try to mix it with the rest of the form so it returns the name of the client + doc.
  // Next time, you can maybe try a way to console.log the whole req that we are gonna send to the backend. 

if (data === undefined) {

    return (<>Still loading...</>)
}

if (!data){
    return 
    <h1>Not allowed</h1>
    
} else

/* if (data.clients === null) {
  return (<>You have no client</>)
}  

else

*/

console.log("this is the data" + JSON.stringify(data))
 // console.log("this is the notif.message" + data.notifications.message)

    return(

      
   
    
      


        <div className="home">
            <Sidebar
              rid={data.id}
            />
       

        <div className="homeContainer">
        <Navebar/>
        
       
      <div className="listContainer">

      
      <div>
      <h1>Bonjour {data.name} </h1>

      {data.notifications.length === 0 ? <p style={{marginTop:'2%'}}>Aucune nouvelle notifications </p> :       
      <div>
       <p style={{marginTop:'2%'}}>Notifications</p>
       <div style={{ marginTop: '2%', overflow: 'auto', clear: 'both', height: 'auto' }}>

          { data.notifications.map(createNotif) } 
       </div>
          </div> }
    
        </div>
   


   
        <Datatable 
              clients={data.clients}
              rid={data.id}
              getRowId={(row) => row.data.clients._id}
           
        />
  
        </div>
        


        <div> 
     

      
      

      
     


{/* I get rid of all of above just for now for aesthetic */}
{/* 
    {data.clients.map(createClients)} 
        
    <div> 
        <h1>Hello {data.username} </h1>
        <p>Here's the list of all your clients</p>

        
          <h2>notifications</h2>
          <p>Here's the list of all your notifications</p>
          { data.notifications.map(createNotif) }   
        </div>

    {/* for some reason here, when you put the onsubmit=newclient on the button, it doesn't work. Page reload instant and DB doesn't get updated. 
    Would be interesting to know why. */}

   
   

        </div>

 </div>
 </div>
 
    )
  
}