import React from "react";
import { NavLink } from "react-router-dom";
import { Switch } from "@mui/material";

function NavBar({ loggedUser, onLogOut}) {


  return (
    <nav id="header-nav">
      {!loggedUser ? null : (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/manage">Account Management</NavLink>
          <NavLink onClick={onLogOut} to="/">
            Logout
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
