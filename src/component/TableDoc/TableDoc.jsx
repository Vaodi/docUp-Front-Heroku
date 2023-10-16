import "./TableDoc.scss";
import Axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { GridToolbar } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const TableDoc = (props) => {
 console.log("props.ridi" + JSON.stringify(props))

 const [previewUrl, setPreviewUrl] = useState('');
 
 function handlePreview(fileUrl) {
  console.log("this is file url " + fileUrl)
  setPreviewUrl(fileUrl);
  window.open(fileUrl, '_blank');
}

// function to pull the id of the document to be deleted
    const handleDelete = async (id) => {
      console.log("id 32" + id);
    try {
      await Axios({
        method: 'DELETE',
        withCredentials: true,
        data: {
            doc_id: id,
            client_id: props.ridi,
          
        },
        url: 'https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deleteDocument',
      });
      console.log(`Reason deleted successfully.`);
     //window.location.reload();
    } catch (error) {
      console.log("Failed to delete the doc ");
    }
    
  };  

  console.log("my proooops" + JSON.stringify(props));
  

  const columns2 = [

   
  
    { field: "client_name", headerName: "Document", width: 340 ,  
    valueGetter: (params) =>
      `${params.row.name || ""} ${params.row.client_lastName || ""}`,
  },

  { field: "docStatus", headerName: "Review", width: 140, 
  cellClassName: (params) => {
    const status = params.value.toLowerCase();
    if (status === "good") {
      return "goodStatus";
    } else if (status === "bad") {
      return "badStatus";
    } else if (status === "to review") {
      return "toReview";
    }
    return ""; // Default CSS class if the status is not recognized
  },
  valueGetter: (params) =>
  `${params.row.review || ""}`,


},

    { field: "program", headerName: "Availability", width: 150 ,
    cellClassName: (params) =>{ 
  const availability = params.value.toLowerCase();
  if (availability === "uploaded") {
    return "uploaded";
  } else if (availability === "not uploaded") {
    return "notUploaded";
  } 
  return ""; // Default CSS class if the status is not recognized
},
valueGetter: (params) =>
`${params.row.status || ""}`,
},




  
 


      {
        field: "action2",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link to={"/user/doc/" + params.row._id} style={{ textDecoration: "none" }}>
                <div className="viewButton">Details</div>
              </Link>
            
            { params.row.status !=='not uploaded' ?
              <Button onClick={() => handlePreview('https://docup-backend-d5e8d90cd77f.herokuapp.com/documents/'+ params.row.doc_upload)}
              >Preview</Button> : null

            }
                
             
         {/*      <div
         
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
                Delete
              </div>
              > */}
            </div>
          );
        },
      },
/* 
      {
        field: "action",
        headerName: "Action1",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link to={"/user/" + params.row._id} style={{ textDecoration: "none" }}>
                <div className="viewButton">Upload</div>
              </Link>
              <Link to={"/user/" + params.row._id} style={{ textDecoration: "none" }}>
                <div className="viewButton">Download</div>
              </Link>
   
            </div>
          );
        },
      },
 */
      
      { field: "dateDeadline", headerName: "Delete User", width: 190 , renderCell: (params) => (
      
      
        <div>
           
       {/* button that deletes document here */}
    
        <button onClick={() => handleDelete(params.row._id)}>Delete</button> 
  
      </div>
  
      
  
      ) },

   
  ]
 

  return (
    
    <div className="datatable">
  
     
      <DataGrid
      
        
        rows={props.clients}
        columns={columns2}
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

export default TableDoc;