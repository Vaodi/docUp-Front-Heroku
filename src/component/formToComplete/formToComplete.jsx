
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { GridToolbar } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import Axios from "axios";
import Button from '@mui/material/Button';

import PDFFile from '../../component/pdfFile/PdfFile.js';
import { PDFDownloadLink } from "@react-pdf/renderer";


const FormToComplete = (props) => {
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [clientID, setClientID] = useState();
  const ClientURL = useParams()
  console.log("my client url" + JSON.stringify(ClientURL))
  // handleConfirm does the actual deleting of the client

  const handleConfirm = async(id)=> {
   // id.preventDefault();
   console.log("I am deletiiiing " + clientID)
    try {
      await Axios({
        method: 'DELETE',
        withCredentials: true,
        data: {
           // template_id: a.id,
            client_id: clientID,
          
        },
        url: 'https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deleteClient',
      });
      console.log(`Client deleted successfully.`);
      setShowConfirmation(false);
     window.location.reload();
    } catch (error) {
      console.log(error)
      console.log("Failed to delete the Client");
    }  
    
  };

  // handleCancel hides the confirmation dialog
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  // handleDelete shows the confirmation dialog

  const handleDelete = (id) => {
    console.log("aaa" + id);
    setClientID(id);
    setShowConfirmation(true);
   // console.log("Do you want to proceed?");
  }; 

  console.log("my priiiiips" + JSON.stringify(props));
  

  const columns2 = [
  
    { field: "form_name", headerName: "Form to complete", width: 380 ,
    valueGetter: (params) =>
      `${params.row.name || ""} `,
  },

    { field: "status", headerName: "Status", width: 120,  renderCell: (params) => {
      let className = '';
  
      // Check the value of params.value and assign a class name accordingly
      if (params.value === 'uncomplete') {
        className = 'uncompleted-cell';
      } else if (params.value === 'completed') {
        className = 'complete-cell';
      }
  
      return (
        <div className={className}>
          {params.value}
        </div>
      );
    },
  },

   
  ]

  // actionColumn is used here to add the action buttons
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const rowId = params.row._id
        return (
          <div className="cellAction">
  
        {   params.row.status ==='completed' ? (  <PDFDownloadLink document={<PDFFile customProp={props.data.clients[props.clientIndice]} formName={params.row.name}/>}  filename="FORM">
       <Button>Download</Button> 
      </PDFDownloadLink>) : null}
        

            
          </div>
            
          
        );
      },
    },
  ];
  return (
    
    <div className="datatable">
   
     
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete?</p>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      <DataGrid
      
        
        rows={props.clients}
        columns={columns2.concat(actionColumn)}
        getRowId={(row) => row._id}
     
        components={{
    Toolbar: GridToolbar ,
  }}

  componentsProps={{
    Toolbar: {
      sx: {
        marginLeft:'30px',
      },
    },
  }}
      

       
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
       
      />
    </div>
  );
};

export default FormToComplete;