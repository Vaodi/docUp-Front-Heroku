import { useSlotProps } from "@mui/base"



const DocForEmail = (props) => {
console.log("props du 3" + JSON.stringify(props))
   
    
        return (
      

       
          

          
            <div className="docForEmail">
     <div className="reasonMap">

    
               
                {props.status === "not uploaded" && props.review !== "bad"? (
                <span> <strong>{props.name}</strong>  :  {props.description} </span> ) : null}
    
                
                </div>

    
            </div>
           
        )
}

export default DocForEmail;