import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ScholarStats</Link>
      </div>

      <ul className="navbar-menu">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/upload">Upload</Link>
        </li>

        <li>
          <Link to="/analytics">Analytics</Link>
        </li>

        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>

      <div className="navbar-actions">
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
