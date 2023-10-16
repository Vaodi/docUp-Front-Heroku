import "./docSingle.scss";
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';






export default function DocSolo(props) {

console.log("980" + JSON.stringify(props))

    const { id } = useParams();
    const [data, setData] = useState();
    const [previewUrl, setPreviewUrl] = useState('');
    const [review, setReview] = useState(props.review);
    // reason contient toutes les reviews qui viennent de la db
    const [reason, setReason] = useState(props.reason);
    //reasons contient les reviews qui sont ajoutées par l'utilisateur
    const [reasonDisplay, setReasonDisplay] = useState("");
    const [newReason, setNewReason] = useState("");
    const [AskOtherDoc, setAskOtherDoc] = useState(false);

    const [fileName, setFileName] = useState("");
    const [link, setLink] = useState("");


useEffect(() => {
    Axios ({
       method: "GET",
      withCredentials: true,
        url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth/consultantLog",
 
     
      }).then((res) => {
       setData(res.data);       
      });
 }, []) 


  
 function handlePreview(fileUrl) {
  console.log("this is file url " + fileUrl)
  setPreviewUrl(fileUrl);
  window.open(fileUrl, '_blank');
}

 const onChangeFile = (e) => {
  setFileName(e.target.files[0]);
};


const changeonclick = (e) => {
  console.log("putain j'en aie ras le cul de mrde")

  e.preventDefault();

  const formData = new FormData();

  console.log("ca c ta putain de data" + JSON.stringify(data));

  formData.append("doc_upload", fileName);
 
/*   var docLength = data.documents.length;
  console.log("this is the length of the array" + docLength);
 */
  // we append whatevr var we want to send that is stock in the state "data"

  // ici tu envois tous les id de tous les docs du client pour qu'ensuite il fase le trie dans le users route
/*   for (var i = 0; i < docLength; i++) {
    formData.append("doc_id" + i , data.documents[i]._id);
  } */

  
    formData.append("doc_id" , props.id);
    formData.append("client_id", props.clientId);


    //formData.append("client_name", props.clientName);
  


  // formData.append("_id", data._id);
  

  Axios.put("https://docup-backend-d5e8d90cd77f.herokuapp.com/users/" + id , formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  }).then((res) => {
    window.location.reload();
    setLink(res.data.path);
      console.log(res);
      console.log("this is my res elias" + JSON.stringify(res.data.path));
  }
  );
}


 const docReviewYes = async (e) => {

//  e.preventDefault()
    try {

      const dataToSend = {
        doc_id: id,
        client_id: clientId,
        review: review,
        reason: newReason,
      }

      if (AskOtherDoc) {
        dataToSend.status = 'not uploaded';
        dataToSend.doc_upload = 'none'; // You can set the initial value to whatever you need
      }


      await Axios ({
          method: "PUT",
          withCredentials: true,
          data: dataToSend,
          url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/revReason"  ,
        })
      //  window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


 const setPositiveReview = () => {
  setReview('good')
  setAskOtherDoc(false)
 }

  const addReason = () => {
    if (newReason.trim() !== "") { // Make sure the reason is not empty or whitespace
     // setReasons([...reasons, newReason]); // Add the new reason to the reasons array
     setReasonDisplay(newReason)
      setReason(); // Clear the reason input
    }
  };


 // function to delete the reason from the database
 const deleteReason = async (reasonid) => {
    try {
      await Axios({
        method: 'DELETE',
        withCredentials: true,
        data: {
            doc_id: id,
            client_id: clientId,
          id: reasonid,
        },
        url: 'https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deleteReason',
      });
      console.log(`Reason deleted successfully.`);
     window.location.reload();
    } catch (error) {
      console.log(`Failed to delete reason with ID ${id}.`, error);
    }
  };

  const labelClass = review === 'good' ? 'green-label' : (review === 'to review' ? 'blue-label' : 'red-label');


  const handleCheckboxChange = (event) => {
    setAskOtherDoc(event.target.checked);
  };

if (data === undefined) {

    return (<>Still loading...</>)
}


let clientId;

for (const client of data.clients) {
  for (const document of client.documents) {
    if (document._id === id) {
      clientId = client._id;
      break;
    }
  }
  if (clientId) {
    break;
  }
}

console.log("Client ID:", clientId);

console.log("woopsy" + JSON.stringify(data))

// we filter only the document with the corresponding id 
/* const documentos = data.clients.reduce((foundDocument, client) => {
    if (!foundDocument) {
      const found = client.documents.find(doc => doc._id === id);
      if (found) return found;
    }
    
    return foundDocument;
  
  }, null);

    console.log("this is the document" + JSON.stringify(documentos)) */
    

 
    


  

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

  
      
      


    



     
       

        
       
      <div >



{props.link !=='none' ? <Button  size="small" variant="outlined" onClick={() => handlePreview('https://docup-backend-d5e8d90cd77f.herokuapp.com/documents/'+ props.link)}
              >Voir document</Button> : <span className="aucunFichier">Aucun fichier téléversé</span> }


              <span className={`label ${labelClass}`}>{review}</span>
      
      <div>
      { <h2 className="marginTop">{props.name} </h2> }
     

     

 </div>

 <div>
 { <p className="marginTop">{props.description}</p> }
 </div>

 <div>

<div>
{/* This shows the reasons that are FROM the db coming FROM the props */}
{/* {props.reason.map(reason => (
    <div>
    <p key={reason._id}>{reason.title}</p>
    <Button onClick={() => deleteReason(reason._id)}>Delete reason</Button>
    </div>
  ))} */}

</div>
 
 <div>



    {/* This shows the reasons that you are adding just now */}
{ newReason || props.reason ?<div className="marginTop" > Problème(s) : {reasonDisplay || props.reason}</div> : null}
</div>
 </div>
 
 <form onSubmit={docReviewYes}>

 {props.link !== 'none' ? (
  <>
    <label>Veuillez juger le document : </label>
    <Button color="success" size="small" variant="outlined" onClick={setPositiveReview}>
      Good
    </Button>
    <Button style={{ marginLeft: '10px' }} color="error" size="small" variant="outlined" onClick={() => setReview("bad")}>
      Bad
    </Button>
    {/* <Button onClick={() => setReview("missing")}>Missing</Button> */}
    {review === 'bad' ? (
      <div className="marginTop">
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          className="reasonInput"
          type="text"
          onChange={(e) => setNewReason(e.target.value)}
          placeholder="Raisons pour lequel(s) le document n'est pas bon"
          
        />
        <div className="reasonSettings">
          <FormControlLabel control={<Checkbox />} onChange={handleCheckboxChange} label="Demander une nouvelle soumission" />
          <Button color="error" size='small' variant="outlined" style={{ marginLeft: '30%', marginTop: '1%' }} onClick={addReason}>Enregistrer la raison </Button>
        </div>
      </div>
    ) : null}
  </>
) : null}


<div className="saveButton">
<Button variant="contained"  color="success" type="submit">Sauvegarder</Button>

</div>

</form>
<p>{document.reason}</p>

<div>
{/*   <h3>Upload</h3>

  <form onSubmit={changeonclick} encType="multipart/form-data">
  <label htmlFor="file">Choose article image</label>
       {/* Here I have a dynamic file name that is dynamic only based on the props.name */}
      {/*   <input type="file" fileName="doc_upload" name={props.rid} onChange={onChangeFile} />  */}
{/* 
        <button type="submit">Upload</button> */}
        
{/*   </form>  */}
</div> 
 </div>
 


    )
}