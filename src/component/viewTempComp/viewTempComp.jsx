import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import Axios from "axios";
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { GridToolbar } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
// import { use } from "../../../../api/routes/updateClient";

const ViewTemplateTable = (props) => {
 

    var a = useParams();
   
    for (let i = 0; i < props.clients.length; i++) {
      if (props.clients[i]._id === a.id) {
          // when we find the client, we need to store the indice of the client in the array
   
          // which then become the clientIndice i that we can use to render HTML
          var clientIndice = i;
   
      }
  }

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

     const handleDelete = async (id) => {
        console.log("this is " + id);
        console.log("this is template id" + a.id);

      try {
        await Axios({
          method: 'DELETE',
          withCredentials: true,
          data: {
             template_id: a.id,
              doc_id: id,
            
          },
          url: 'https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deleteDocInTemplate',
        });
        console.log(`Document deleted successfully.`);
       window.location.reload();
      } catch (error) {
        console.log("Failed to delete the Template");
      }  
      
    };  




  const columns2 = [
  
    { field: "client_name", headerName: "Document Name", width: 780 ,
    valueGetter: (params) =>
        `${params.row.name || ""} `,
    },

 
   
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

             <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
              
            >Delete</div>

            
          </div>
        );
      },
    },
  ];

  if (data === undefined) {

    return (<>Still loading...</>)
}

else {


  return (
    
    <div className="datatable">
      <div className="datatableTitle">
      
      
      </div>
     
     <div>
      
     </div>
      <DataGrid
      
        
        rows={props.clients[clientIndice].documents}
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
};

export default ViewTemplateTable;