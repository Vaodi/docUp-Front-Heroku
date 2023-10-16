import { useState, useEffect, useRef} from "react";

import Axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Documents from '../../component/document/Document'
import Clients from '../../component/client/Client'
import Input from "../../component/input/Input";
import Notifications from "../../component/notification/Notification";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DocSolo from "../../component/docSingle/docSingle";





export default function DocSingle() {


    const { id } = useParams();
    const [data, setData] = useState();
    


useEffect(() => {
    Axios ({
       method: "GET",
      withCredentials: true,
        url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth/consultantLog",
 
     
      }).then((res) => {
       setData(res.data);       
      });
 }, []) 

    

if (data === undefined) {

    return (<>Still loading...</>)
}



if (!data){
    return 
    <h1>Not allowed</h1>
    
} else {




 // we filter only the document with the corresponding id 
 const documentos = data.clients.reduce((foundDocument, client) => {
  if (!foundDocument) {
    const found = client.documents.find(doc => doc._id === id);
    if (found) return { document: found, clientId: client._id }; // Include clientId in the returned object
  }
  
  return foundDocument;
}, null);


  console.log("this is the document" + JSON.stringify(documentos))
  console.log("this is the data" + JSON.stringify(data))

  
  const goBack = () => {
    window.location.href = "http://localhost:3000/user/fake/" + documentos.clientId;
    };


console.log("pssshy" + data.review)
/* if (data.clients === null) {
  return (<>You have no client</>)
}  

else

*/


    return(

      
   
    
      


        <div className="home">
            <Sidebar
              rid={data.id}
            />
       

        <div className="homeContainer">
        <Navebar/>
        
        <Button onClick={goBack}>Go back</Button>
       
      <div className="listContainer">

 
      <div>
     
<DocSolo
  id={id}
  rid={data.id}
  name={documentos.document.name}
  description={documentos.document.description}
  review={documentos.document.review}
  reason={documentos.document.reason}
  docID={documentos.document._id}
  clientId={documentos.clientId}
  link={documentos.document.doc_upload}

/>
     

  

 </div>

 <div>

 </div>
 

<p>{document.reason}</p>
 </div>
 
 </div>
 
 
    </div>
    )
}}