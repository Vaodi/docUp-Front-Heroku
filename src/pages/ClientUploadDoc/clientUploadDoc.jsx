import "./clientUploadDoc.scss"
import SidebarClient from "../../component/sideBarClient/SideBarClient";
import Navebar from "../../component/navbar/Navbar";
import Axios from "axios";
import { useState, useEffect } from "react";
import DocReview from "../../component/docReview/docReview";
import { useParams } from "react-router-dom";

export default function ClientUploadDoc () {

    const [data, setData] = useState();
    const [numberDoc, setNumberDoc] = useState('');
    const { id } = useParams()

    useEffect(() => {
        Axios ({
           method: "GET",
          withCredentials: true,
          url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",
     
         
          }).then((res) => {
           setData(res.data);
         

           console.log("my userssss" + JSON.stringify(res.data));
          
           
          });


     },[]) 


      
      useEffect(() => {
        // This code will run whenever `data` changes
        if (data) {
          const notUploadedDocuments = data.documents.filter(
            (document) => document.status === "not uploaded"
          );
          console.log("the missing doc" + JSON.stringify(notUploadedDocuments));
          console.log("the length of missing doc" + notUploadedDocuments.length);
          setNumberDoc(notUploadedDocuments.length);
        }
      }, [data]);

     
    

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
            clientName={data.firstName}
        />
    }

    if (data === undefined) {
    

        return (<>Still loading...</>)
    }
    
    if (!data){
        return 
        <h1>Not allowed</h1>
        
    } 

    if (data){
   
       
       
return (
    <div>

    
     

        <div className="home">
        <SidebarClient/>
   

    <div className="homeContainer">
    <Navebar/>
    
    <div className="clientContainer">

<div >
<span>Bonjour {data.firstName}, <br/> </span>
<div className="marginTop">
{numberDoc !== 0 ? <span> Merci de téléverser les documents suivants.<br/> Il vous reste <span style={{color:'red', fontWeight: 'bold'}}>{numberDoc} documents </span>à téléverser. Veuillez noter que la vérification de votre dossier ne pourra se faire que lorsque vous aurez téléverser <span style={{color:'red', fontWeight: 'bold'}}>tous les documents.</span></span> :  <span>Merci d'avoir téléverser tous les documents. Nous reviendrons vers vous sous peu. </span> }


</div>



</div>
{data.documents.map(displayDocuments)} 
    </div>
    </div>
    </div>
    </div>
)
}
}
