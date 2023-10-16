import { useState, useEffect } from "react";
import Axios from "axios";
import './FormToComplete.scss'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Documents from '../../component/document/Document'
import SidebarClient from "../../component/sideBarClient/SideBarClient";
import Navebar from "../../component/navbar/Navbar";
import FormTable from "../../component/formTable/formTable"
import { Button, TextField } from "@mui/material";


export default function Homepage() {


    const { id } = useParams()

    
    const [data, setData] = useState();


useEffect(() => {
    Axios ({
       method: "GET",
      withCredentials: true,
        url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",
 
     
      }).then((res) => {
       setData(res.data);
       console.log(res.data);
       console.log("bob l'epong eseeeeeet " + JSON.stringify(data));
       
      });
 }, []) 
   


    
if (data === undefined) {

    return (<>Still loading...</>)
}

if (!data){
    return 
    <h1>Not allowed</h1>
    
} else
console.log("this is the loaded data  " + JSON.stringify(data))



// console.log("this is the user  " + user)
    return(
        <div className="home">
        <SidebarClient/>
   

    <div className="homeContainer">
    <Navebar/>

        <div> 
        <div className="titleHome" >
        <h2>Formulaire à compléter</h2>

        <div className="titleHomeKid"> 
        <span>Bonjour {data.firstName}, </span> 
        <div className="marginTop">
        <span ><br/>Voici la liste des formulaires que vous devez compléter</span>

        </div>
        </div>
        </div>
   {     <FormTable
              clients={data.formToComplete}
              deadline={data.deadline}
              rid={data.id}
              getRowId={(row) => row.data.clients._id}
           
        /> }
    </div>
    </div>
    </div>



    )
}