import { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../../component/sidebar/Sidebar";
import Navebar from "../../component/navbar/Navbar";
import ViewTemplateTable from "../../component/viewTempComp/viewTempComp";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function ViewTemplate() {

    const [data, setData] = useState();
    const [templateName, setTemplateName] = useState();
    const [templateId, setTemplateId] = useState(useParams().id);


    const changeTemplateName = async (e) => {
      //  e.preventDefault();
       
     try {
        await Axios({
            method: 'PUT',
            withCredentials: true,
            data: {
                template_id: templateId,
                template_name: templateName,
            },
            url: 'https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/updateTemplateName',
        });
        console.log(`Template name updated successfully.`);
        //window.location.reload();
    } catch (error) {
        console.log("Failed to update the Template name");

     }
    }

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


    <h2 style={{marginLeft:'3%', marginTop:'3%'}}>Votre template</h2>
    <form onSubmit={changeTemplateName}> 
    <div style={{marginLeft:'3%', marginTop:'3%'}} >
    Changer le nom du template: <TextField variant="outlined" size="small" type="text" name="name" onChange={(e) => setTemplateName(e.target.value)} />
    <Button style={{marginLeft:'3%'}} variant="outlined" size='small' type="submit">Change</Button>

    </div>
    </form>

   <ViewTemplateTable
              clients={data.docTemplates}
            //  rid={data.id}
             // getRowId={(row) => row.data.docTemplates._id}
           
        />  
        </div>
        
        </div>
      
        </div>
    )
}
}

