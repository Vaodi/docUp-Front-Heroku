import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import StoreIcon from "@mui/icons-material/Store";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FolderIcon from '@mui/icons-material/Folder';

import { Link, useParams } from "react-router-dom";

import { useContext } from "react";


const SidebarClient = (props) => {

  const encodedId = encodeURIComponent(useParams);

  // const { dispatch } = useContext(DarkModeContext);
  const { id } = useParams();
  console.log('freroooo ' + id)
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">DocUp</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <Link to={"/homepage-client/" + useParams} style={{ textDecoration: "none" }}>
            <span>Accueil</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to={"/forms-to-complete/"+ id} style={{ textDecoration: "none" }}>
            <li>
              <AssignmentTurnedInIcon className="icon" />
              <span>Formulaire</span>
            </li>
          </Link>
          <Link to={`/docUpload/` + id } style={{ textDecoration: "none" }}>
            <li>
              <FolderIcon className="icon" />
              <Link to={`/docUpload/` + id } style={{ textDecoration: "none" }}>
              <span>Document</span>
              </Link>
            </li>
          </Link>
  {/*         <li>
            <CreditCardIcon className="icon" />
            <span>Other</span>
          </li> */}
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">CREATE</p>
          <Link to={"/newClient/"+ id} style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Client</span>
          </li>
          </Link>
          <li>
            <NotificationsNoneIcon className="icon" />
            <Link to={"/docTemplate/" + id } style={{ textDecoration: "none" }}>
            <span>Template</span>
            </Link>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>*/}
        </ul> 
      </div>
      <div className="bottom">
     {/*    <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div> */}
     {/*    <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div> */}
      </div>
    </div>
  );
};

export default SidebarClient;