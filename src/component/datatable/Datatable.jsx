import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { GridToolbar } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import Axios from "axios";


const Datatable = (props) => {
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [clientID, setClientID] = useState();

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
  
    { field: "client_name", headerName: "Nom", width: 180 ,
    valueGetter: (params) =>
      `${params.row.client_firstName || ""} ${params.row.client_lastName || ""}`,
  },

    { field: "program", headerName: "Programme", width: 150,  valueGetter: (params) =>
    `${params.row.program || ""}` },

    { field: "docStatus", headerName: "Status", width: 120,   valueGetter: (params) =>
    `${params.row.fileStatus || ""}`,
    cellClassName: (params) => {
      const status = params.row.fileStatus || "";
      if (status === "uncomplete") {
        return "uncompleted-cell"; // Apply your CSS class for completed status
      } else if (status === "to review") {
        return "to-review-cell"; // Apply your CSS class for 'to review' status
      }  else if (status === "complete") {
        return "complete-cell"; // Apply your CSS class for 'to review' status
      }   else if (status === "late") {
        return "late-cell"; // Apply your CSS class for 'to review' status
      } else if (status === "client to notify") {
        return "client-to-notify"; // Apply your CSS class for 'to review' status
      } 
      return ""; // No special styling for other statuses
    },
},
    { field: "dateDeadline", headerName: "Date limite", width: 190 , renderCell: (params) => (
      
      
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
        return (
          <div className="cellAction">
            <Link to={"/user/fake/" + params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Voir</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
              
            >Supprimer</div>

            
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

export default Datatable;