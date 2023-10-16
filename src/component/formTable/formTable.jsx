
import { DataGrid } from "@mui/x-data-grid";
import './formTable.scss'
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { GridToolbar } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import Axios from "axios";


const Datatable = (props) => {
 
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

  console.log("my pipi" + JSON.stringify(props));
  

  const columns2 = [
  
    { field: "form_name", headerName: "Form to complete", width: 180 ,
    valueGetter: (params) =>
      `${params.row.name || ""} `,
  },



    { field: "status", headerName: "Status", width: 120,  renderCell: (params) => {
      return (
        <div className={params.value === 'uncomplete' ? 'uncompleteCell' : 'completeCell'}>
          {params.value}
        </div>
      );
    }, } ,
    { field: "dateDeadline", headerName: "Date Deadline", width: 190 , renderCell: (params) => (
      
      
      <p>{props.deadline && props.deadline !== undefined ? props.deadline.split("T")[0] : "no deadline set"}</p>

    

    ) },


   
  ]

  // actionColumn is used here to add the action buttons
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if (params.row.status === 'completed') {
          return null; // Return null to hide the button
        }
        return (
          <div className="cellAction">
            <Link to={"/users/fill/" + params.row.link+ "/" + ClientURL.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Remplir</div>
            </Link>
         

            
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

export default Datatable;