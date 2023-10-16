import { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import TemplateTable from "../../component/templatetable/TemplateTable";

export default function TemplateList() {

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

     console.log("data is" + JSON.stringify(data))

     if (data === undefined) {

        return (<>Still loading...</>)
    }
    
    else {

    return (
        <div>
             <div className="home">
        <Sidebar/>
  

    <div className="homeContainer">
    <Navebar/>


    <h2 style={{marginLeft : '3%', marginTop : '3%'}}>Template List</h2>

     <TemplateTable
              clients={data.docTemplates}
              rid={data.id}
              getRowId={(row) => row.data.docTemplates._id}
           
        /> 
        </div>
        
        </div>
      
        </div>
    )
}
}

