// Purpose: To test the login page design
//
import "./LoginDesign.scss"
import { useState } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';



export default function LogIn () {



  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();


// studpid stuff







// stupid stuff end

  const login = (event) => { 
    event.preventDefault(); 
    console.log("user" + loginUsername);
    console.log("mdp" + loginPassword);
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth/consultantLog",

      
    }).then((res)  => res.data !='No User Exists' ? navigate ('/homepage-consultant/' + res.data._id) : null );
 
  };

  const routeRegister = () =>{ 
    let path = `/register`; 
    navigate(path);
  }


    const showHidePassword = () => {
        // Implement the show/hide password functionality
      };

    return (
        <section>
          <div className="box">
            <div className="square" style={{ '--i': 0 }}></div>
            <div className="square" style={{ '--i': 1 }}></div>
            <div className="square" style={{ '--i': 2 }}></div>
            <div className="square" style={{ '--i': 3 }}></div>
            <div className="square" style={{ '--i': 4 }}></div>
            <div className="square" style={{ '--i': 5 }}></div>
    
            <div className="container">
              <div className="form">
                <h2>Log in to DocUp</h2>
                <form >
                  <div className="inputBx">
                  
                    <input type="text" required="required"
                     onChange={(e) => setLoginUsername(e.target.value)}
                     />
                   <span>Username</span>
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="inputBx password">
                    <input
                      id="password-input"
                      type="password"
                      name="password"
                      required="required"
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <span>Password</span>
                    {/* <a href="#" className="password-control" onClick={showHidePassword}></a> */}
                    <i className="fas fa-key"></i>
                  </div>
             {/*      <label className="remember">
                    <input type="checkbox" />
                    Remember
                  </label> */}
                  <div className="inputBx">
                    <input type="submit" value="Log in" onClick={login}  />
                  </div>
                </form>
              {/*   <p>
                  Forgot password? <a href="#">Click Here</a>
                </p> */}
                <p>
                  Pas de compte ? <a href="http://localhost:3000/register">Créer un ici !</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      );

}

