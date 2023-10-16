import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import Axios from "axios";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { GridToolbar } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

const TemplateTable = (props) => {
 

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
      try {
        await Axios({
          method: 'DELETE',
          withCredentials: true,
          data: {
             // doc_id: id,
              template_id: id,
            
          },
          url: 'https://docup-backend-d5e8d90cd77f.herokuapp.com/updateClient/deleteTemplate',
        });
        console.log(`Template deleted successfully.`);
       window.location.reload();
      } catch (error) {
        console.log("Failed to delete the Template");
      }
      
    };  


  console.log("my proooops" + JSON.stringify(props));
  

  const columns2 = [
  
    { field: "client_name", headerName: "Template Name", width: 780 ,
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
            <Link to={"viewTemplate/" + params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Modifier</div>
            </Link>
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
};

export default TemplateTable;