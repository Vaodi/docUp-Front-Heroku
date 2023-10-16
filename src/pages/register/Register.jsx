import './register.css';
import { useState } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [email, setEmail] = useState("");

  const [validated, setValidated] = useState(false);
  const [userExist, setUserExist] = useState(false);



  const register = async (e) => {
    e.preventDefault()
  
    try {
      const response = await Axios({
      method: "POST",
      data: {
        consultantUsername: registerUsername,
        consultant_Password: registerPassword,
        consultant_name: registerName,
     
        email: email,
       /*  notifications : [
            {
                message: "Welcome to your dashboard",
                date: "2021-05-05"
            },
            {
                message: "You have 2 new documents to review",
                date: "2021-05-05"
            }
        ] */
      },
      withCredentials: true,
      url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/users",
    }
    )
    if (response.status === 200) {
 
      // Handle success (e.g., show a success message to the user)
      setValidated(true); // Set success to true if registration is successful
      setUserExist(false)
      console.log("been validated")
    }else if (response.status === 204) {
      setUserExist(true)
      setValidated(false)
      console.log("User Already Exists");
      
      // Handle the case where the user already exists (e.g., show an error message to the user)
    }
  

  } catch (error) {
    console.error("Error during registration:", error);
  }
};


    return (
        <div className="register">
        <span className="registerTitle">Créer votre compte</span>
        <form className="registerForm" onSubmit={register}>
          <label>Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
          />
           <label>Nom</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your name"
            onChange={(e) => setRegisterName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
             onChange={(e) => setEmail(e.target.value)}
             required
    
          />
          <label>Mot de passe</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <button className="registerButton" type="submit">
            Valider
          </button>
        </form>
        <button className="registerLoginButton">
          {/* <Link className="link" to="/login">
            Login
          </Link> */}
        </button>
        {validated && <span style={{color:"green", marginTop:"10px", fontSize: "20px"}}>Compte crée ! Merci de retourner à l'écran d'acceuil <a href="http://localhost:3000/">ici</a></span>}
        {userExist && <span style={{color:"red", marginTop:"10px", fontSize: "20px"}}>Username déjà pris, merci d'en choisir un autre </span>}
      </div>
    )

}