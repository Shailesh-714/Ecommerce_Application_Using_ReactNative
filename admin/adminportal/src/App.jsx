import { useState } from "react";
import Navigation from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main-screen"></div>
    </div>
  );
}

export default App;
