import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";


export default function Client(props) {

const deleteClient = async () => {
  
  console.log("delete client");
  console.log("this is my props rid" + props.rid);

  try {
      await Axios ({
        method: "DELETE",
        withCredentials: true,
        data: {
            id: props.rid,

        },
         url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deleteClient"  ,
    })
  } catch (error) {
    console.log(error);
  }
}

    return (
      <div className="header">
       <p>{props.name}</p>
        <Link to={`/user/${props.rid}`}>Go to client</Link>
        <form onSubmit={deleteClient}>
        <button type="submit">Delete client</button>
        </form>
        <p>{props.rid}</p>
      </div>
    );
  }

