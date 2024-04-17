import React from "react";
import "./Navbar.css";
import logo from "../../assets/img/name_logo.png";

const Navigation = () => {
  return (
    <nav>
      <img src={logo} className="logo" />
      <ul>
        <a href="#">
          <li>Dashboard</li>
        </a>
        <a href="#">
          <li>Products</li>
        </a>
        <a href="#">
          <li>Orders</li>
        </a>
        <a href="#">
          <li>Customers</li>
        </a>
        <a href="#">
          <li>Settings</li>
        </a>
      </ul>
    </nav>
  );
};

export default Navigation;
