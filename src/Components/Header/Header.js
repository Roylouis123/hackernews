import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <header className="headercontainer">
        <div className="headerheading">
          <h1>Heacker News</h1>
        </div>

        <div className="headermenu">
          <NavLink
            to="/home"
            className="btn"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              background: isActive ? "rgb(0, 170, 255" : "#f0f0f0",
              textDecoration: "none",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/new"
            className="btn"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              background: isActive ? "rgb(0, 170, 255" : "#f0f0f0",
              textDecoration: "none",
            })}
          >
            New
          </NavLink>
          <NavLink
            to="/search"
            className="btn"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              background: isActive ? "rgb(0, 170, 255" : "#f0f0f0",
              textDecoration: "none",
            })}
          >
            Search
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default Header;
