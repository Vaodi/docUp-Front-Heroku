import React from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {

    let navigate = useNavigate(); 

    const routeChangeConsultant = () =>{ 
      let path = `login-cons`; 
      navigate(path);
    }

    const routeChangeClient = () =>{ 
        let path = `/login`; 
        navigate(path);
      }
    return (
        <div>
            <label> I am a consultant </label>
            <button onClick={routeChangeConsultant} >Go</button>
            <label> I am a client </label>
            <button onClick={routeChangeClient} >Go</button>
        </div>
    )
}