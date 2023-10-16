import { useState, useEffect } from "react";
import './HomePageClient.scss'
import {useParams } from "react-router-dom";
import Axios from "axios";
import SidebarClient from "../../component/sideBarClient/SideBarClient";
import Navebar from "../../component/navbar/Navbar";

export default function HomepageClient() {


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
        <h2>Bonjour {data.firstName}</h2>

        <div className="titleHomeKid"> 
       

        <div className="welcomeClient">
        <span > Bienvenue sur votre portail client.  </span>

        </div>

        <div className="welcomeClient">

        <span  ><br/>Merci de téléverser vos documents dans l'onglet 'document' (situé à gauche) et de compléter les formulaires dans la section formulaire (s'il y'a lieu)</span>
        </div>
      
        </div>
        </div>

    </div>
    </div>
    </div>



    )
}