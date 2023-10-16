
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { GridToolbar } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import Axios from "axios";

import PDFFile from '../../component/pdfFile/PdfFile.js';
import { PDFDownloadLink } from "@react-pdf/renderer";


const FormClientTable = (props) => {
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [clientID, setClientID] = useState();
  const [tfou, setTfou] = useState();

  console.log("props 33 " + JSON.stringify(props))
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

  console.log("my proooops" + JSON.stringify(props));
  

  const columns2 = [
  
    { field: "client_name", headerName: "Full Name", width: 180 ,
    valueGetter: (params) =>
      `${params.row.name || ""} ${params.row.client_lastName || ""}`,
  },

    { field: "program", headerName: "Program", width: 150 },

    { field: "docStatus", headerName: "Status", width: 120,  renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.value}`}>
          {params.value}
        </div>
      );
    }, },
    { field: "dateDeadline", headerName: "Date Deadline", width: 190 , renderCell: (params) => (
      
      
      <p>{params.value && params.value !== undefined ? params.value.split("T")[0] : "no deadline set"}</p>

    

    ) },


   
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
            <Link to={"/user/fake/" + params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Viewwww</div>
            </Link>
        {     <PDFDownloadLink document={<PDFFile customProp={props.data.clients[props.clientIndice]} myID={rowId}/>}  filename="FORM">
       <button>Download</button> 
      </PDFDownloadLink> }
        

            
          </div>
            
          
        );
      },
    },
  ];
  return (
    
    <div className="datatable">
      <div className="datatableTitle">
      
        <Link to={"/newClient/"+props.rid} className="link">
          Add New Client
        </Link>
      </div>
     
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

export default FormClientTable;