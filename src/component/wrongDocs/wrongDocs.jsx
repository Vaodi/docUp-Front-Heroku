import { useSlotProps } from "@mui/base"
import "./wrongDocs.scss"


const DocForEmail = (props) => {

   console.log("props du opl" + JSON.stringify(props))
    
        return (
      

       
          
<div className="docForEmail">
      {props.review === "bad" ? (
        <div className="reasonMap">
        
       <p><strong>{props.name}</strong> : {props.reason}</p>
        </div>
      ) : null}

      {console.log("this is the props" + JSON.stringify(props))}
    </div>
           
        )
}

export default DocForEmail;