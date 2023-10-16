import { useContext, useRef } from "react";
import * as React from "react";
import { useState } from "react";
import Axios from "axios";
import './App.css';
import Register from "./pages/register/Register";
import LoginClient from './pages/login-client/Login';
//import LoginConsultant from './pages/login-consultant/login-consultant'
import FormToComplete from "./pages/FormToComplete/FormToComplete";
import User from "./pages/user/User";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomepageCons from "./pages/homepage-cons/Homepage-cons";
import Test from "./pages/testos/testos";
import LogIn from "./pages/loginDesignTest/LoginDesign";
import DocTemplate from "./pages/docTemplates/DocTemplate";
import ClientProfile from "./pages/clientProfile/ClientProfile";
import DocSingle from "./pages/docSingle/DocSingle";
import TemplateList from "./pages/templateList/templateList";
import NewForm from "./pages/form/form";
import ViewTemplate from "./pages/viewTemplate/viewTemplate";
import AnnexeA from "./pages/AnnexeA/AnnexeA"
import ClientUploadDoc from "./pages/ClientUploadDoc/clientUploadDoc";
import HomepageClient from "./pages/HomePageClient/HomePageClient";


function App() {



  return (

    <Router>
  
<Routes>
  <Route path="/" element={<LogIn />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={ <LoginClient />} />

  {/* <Route path="/login-cons" element={ <LoginConsultant />} /> */}
  <Route path="/forms-to-complete/:id" element={<FormToComplete />} />
  <Route path="/homepage-client/:id" element={<HomepageClient />} />
  <Route path="/user/:id" element={<User />} />
  <Route path="/user/fake/:id" element={<ClientProfile />} />
  <Route path="/homepage-consultant/:id" element={<HomepageCons />} />
  <Route path="/newClient/:id" element={<Test />} />
  <Route path="/loglol" element={<LogIn />} />
  <Route path="/docTemplate/:id" element={<DocTemplate />} />
  <Route path="/user/doc/:id" element={<DocSingle />} />
  <Route path="/template-list/:id" element={<TemplateList />} />
  <Route path="/newForm" element={<NewForm />} />
  <Route path="/docUpload/:id" element={<ClientUploadDoc />} />
  <Route path="template-list/:id/viewTemplate/:id" element={<ViewTemplate />} />


  <Route path="/users/fill/annexeAlink/:id" element={<AnnexeA />} />

</Routes>
    



   </Router>

)
}

export default App;
