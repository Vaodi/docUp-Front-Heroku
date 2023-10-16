import "./docReview.scss";
import { Grid } from "@mui/material";
import Axios from "axios";
import { useState, useEffect } from "react";
import {  useParams } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';




const DocReview = (props) => {

  console.log("props mais OKLM " + JSON.stringify(props))
 


  const { id } = useParams();
  const [data, setData] = useState();
  const [reasonClick, setReasonClick] = useState(false);
  const [reason, setNewReason] = useState("");
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState("");
  const [link, setLink] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  console.log("ID mais OKLM " + id)

const changeonclick = (e) => {
  console.log("putain j'en aie ras le cul de mrde" )

  e.preventDefault();

  const formData = new FormData();


  formData.append("doc_upload", fileName);
 
/*   var docLength = data.documents.length;
  console.log("this is the length of the array" + docLength);
 */
  // we append whatevr var we want to send that is stock in the state "data"

  // ici tu envois tous les id de tous les docs du client pour qu'ensuite il fase le trie dans le users route
/*   for (var i = 0; i < docLength; i++) {
    formData.append("doc_id" + i , data.documents[i]._id);
  } */

  
    formData.append("doc_id" , props.rid);
    formData.append("client_id", id);
    formData.append("clientName", props.clientName);

    console.log('client name is ' + props.clientName)


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

  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    
  }
  
  const fetchDocument = () => {
  
    fetch('https://docup-backend-d5e8d90cd77f.herokuapp.com/documents/'+ props.path, {
      headers: headers
    })
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "your-file");
        document.body.appendChild(link);
        link.click();
      })}

      const docReviewYes = async () => {
        try {
          await Axios ({
              method: "PUT",
              withCredentials: true,
              data: {
                  doc_id: props.rid,
                  client_id: props.userID,
                  review: "good"
              },
              url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/review"  ,
            })
            window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    
      const docReviewNo = async () => {
        try {
          await Axios ({
              method: "PUT",
              withCredentials: true,
              data: {
                  doc_id: props.rid,
                  client_id: props.userID,
                  review: "bad"
              },
              url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/review"  ,
            });
            // window.location.reload();
            setReasonClick(true);
        } catch (error) {
          console.log(error);
        }
      }
      

      const updateReason = async () => {
        try {
          await Axios ({
            method: "PUT",
            withCredentials: true,
            data: {
                doc_id: props.rid,
                client_id: props.userID,
                reason: reason
            },
            
             url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/reason"  ,
          
        })
        } catch (error) {
          console.log(error);
        }
      }

        function handlePreview(fileUrl) {
          console.log("this is file url " + fileUrl)
          setPreviewUrl(fileUrl);
          window.open(fileUrl, '_blank');
        }

        function resetPreview() {
          setPreviewUrl('');
        }

    console.log("asjnfknaf" + JSON.stringify(props))
    return (
        <div className="boxWraper">
        <div className="box">

        <Grid container spacing={2}>
        
        <Grid item xs={8}>
          <h3 >{props.name}</h3>
        </Grid>

        <Grid item xs={4}>
        <p> <span className={props.status === 'uploaded' ? 'uploaded-status' : 'pending-status'} >{props.status}</span></p>
        </Grid>

        <Grid item xs={8}>
      {props.description}
      </Grid>

        <Grid item xs={4}>

        <form onSubmit={changeonclick} encType="multipart/form-data">
        <label htmlFor="file">Téléverser votre fichier</label>
       {/* Here I have a dynamic file name that is dynamic only based on the props.name */}
        <input  style={{ marginLeft: '10px' }} type="file" fileName="doc_upload" name={props.rid} onChange={onChangeFile} /> 

        <Button   style={{ marginTop: '20px' }} size="small" color="error" variant="contained" type="submit" endIcon={<SendIcon />}>Soumettre</Button>
        
        {  props.status === "uploaded" ? <Button style={{ marginLeft: '20px', marginTop: '15px' }} onClick={() => handlePreview('https://docup-backend-d5e8d90cd77f.herokuapp.com/documents/'+ props.path)}>Voir document</Button> : null}
  </form>
       

        
     
     {/* For the moment I desactivated this that trigger the view in the same page browser but lot of work to do to make it work
      {previewUrl &&
        <>
          {previewUrl.endsWith('.pdf') ?
  

            <iframe  src={previewUrl}  /> :
            <img  src={previewUrl} alt="File Preview" />
         
    
          
          }
          <button onClick={resetPreview}>Close Preview</button>
        </>
      } */}



        </Grid>

       
    
     
{/* 
        <Grid item xs={4}>
        {  props.status === "uploaded" ? <Button variant="outlined" color="success" size="small" onClick={docReviewYes} > Accept</Button>  : null}
        {  props.status === "uploaded" ? <Button variant="outlined" color="error" size="small" onClick={docReviewNo} > Refuse</Button>  : null}
     
        </Grid>

        <Grid item xs={4}>
        {  props.review === "good"  ? <p> You have flagged this document as good </p>  : null}
        {  props.review === "bad"  ? <p> You have flagged this document as bad </p>  : null}
        {  props.review === "bad"  && props.reason ? <p> Reason : {props.reason}  </p>  : null}
        </Grid>

        <Grid item xs={2}>
        <form onSubmit={updateReason}>
        {  props.review === "bad" || reasonClick  ? <label>reason</label>  : null}
        {  props.review === "bad" || reasonClick  ? <input type="text" placeholder="reason" onChange={(e) => setNewReason(e.target.value)} />  : null}
        {  props.review === "bad" || reasonClick  ? <button type="submit"> Submit </button> : null}
        </form>
        </Grid>
 */}
      

      </Grid>
      </div>
      </div>
    )
}

export default DocReview;