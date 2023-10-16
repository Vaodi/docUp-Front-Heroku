import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Document(props) {

  const [fileName, setFileName] = useState("");
  const [link, setLink] = useState("");
  const [data, setData] = useState();

  const onChangeFile = (e) => {
      setFileName(e.target.files[0]);
    };

  const changeonclick = (e) => {
      console.log("putain j'en aie ras le cul de mrde")
 
      e.preventDefault();
    
      const formData = new FormData();
   
      console.log("ca c ta putain de data" + JSON.stringify(data));

      formData.append("doc_upload", fileName);
     
      var docLength = data.documents.length;
      console.log("this is the length of the array" + docLength);

      // we append whatevr var we want to send that is stock in the state "data"
 
      // ici tu envois tous les id de tous les docs du client pour qu'ensuite il fase le trie dans le users route
    /*   for (var i = 0; i < docLength; i++) {
        formData.append("doc_id" + i , data.documents[i]._id);
      } */

      
        formData.append("doc_id" , props.rid);
        formData.append("client_name", props.clientName);
      

  
      formData.append("_id", data._id);
      

      Axios.put("https://docup-backend-d5e8d90cd77f.herokuapp.com/users/" + data._id , formData, {
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

  useEffect(() => {
    Axios ({
       method: "GET",
      withCredentials: true,
        url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",
 
     
      }).then((res) => {
       setData(res.data);
       console.log(res.data);
       console.log("bob l'epong est " + JSON.stringify(data));
       
      });
 }, []) 
   

    return (
      <div className="header">
       <form onSubmit={changeonclick} encType="multipart/form-data">
       <p>{props.name}</p>
       <p>{props.description}</p>
       <p>{props.rid}</p>
       <img src={'https://docup-backend-d5e8d90cd77f.herokuapp.com/documents/'+ props.docUpload} />
       <label htmlFor="file">Choose article image</label>
       {/* Here I have a dynamic file name that is dynamic only based on the props.name */}
        <input type="file" fileName="doc_upload" name={props.rid} onChange={onChangeFile}/> 
        
      
       <button type="submit">Uploaaaad</button>

</form>
      </div>
    );
  }