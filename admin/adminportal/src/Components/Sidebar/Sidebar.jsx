import React from "react";
import logo from "../../assets/img/name_logo.png";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="" className="logo" />
      <ul>
        <li>
          <div className="screenTabs">
            <h4>Dashboard</h4>
          </div>
        </li>
        <li>
          <div className="screenTabs">
            <h4>Orders</h4>
          </div>
        </li>
        <li>
          <div className="screenTabs">
            <h4>Users</h4>
          </div>
        </li>
        <li>
          <div className="screenTabs">
            <h4>Sales Report</h4>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
