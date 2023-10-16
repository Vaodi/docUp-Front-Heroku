import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { Link, useParams } from "react-router-dom";

import { useContext } from "react";

const Sidebar = (props) => {
  // const { dispatch } = useContext(DarkModeContext);
  const { id } = useParams();
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
            <Link to={"/homepage-consultant/" + useParams} style={{ textDecoration: "none" }}>
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
 {/*          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link> */}
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <FormatListNumberedIcon className="icon" />
              <Link to={"/template-list/" + useParams} style={{ textDecoration: "none" }}>
              <span>Template</span>
              </Link>
            </li>
          </Link>
        {/*   <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          <p className="title">CREATE</p>
          <Link to={"/newClient/"+ id} style={{ textDecoration: "none" }}>
          <li>
            <CreateNewFolderIcon className="icon" />
            <span>Client</span>
          </li>
          </Link>
          <li>
            <LibraryBooksIcon className="icon" />
            <Link to={"/docTemplate/" + id } style={{ textDecoration: "none" }}>
            <span>Template</span>
            </Link>
          </li>
        {/*   <p className="title">SERVICE</p>
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
          </li> */}
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

export default Sidebar;