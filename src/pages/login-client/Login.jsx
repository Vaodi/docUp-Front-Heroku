import './Login.scss';
import { useState } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';




export default function Login() {
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const login = () => { 
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",

      
    }).then((res)  => 
   
   res.data !='No User Exists' ? navigate ('/homepage-client/' + res.data._id) : null  );
    
  };

  // res.data !='No User Exists' ? navigate ('/homepage/' + res.data.clients[0].client_name) : null 
  //  res.data !='No User Exists' ? navigate ('/homepage/' + res.data.clients[0].client_name) : null

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",
   
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
      console.log("bob l'epong est " + res);
    });
  };




  


  return (

    
    <div className="login ">
    <span className="loginTitle  ">Login</span>
    <form className="loginForm " >
      <label>Username</label>
      <input
        type="text"
        className="loginInput"
        placeholder="Enter your username..."
        onChange={(e) => setLoginUsername(e.target.value)}
       
      />
      <label>Password</label>
      <input
        type="password"
        className="loginInput"
        placeholder="Enter your password..."
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button className="loginButton"  type="button" onClick={login}>
     
        Login
      </button>
    </form>

  </div>
);
}


