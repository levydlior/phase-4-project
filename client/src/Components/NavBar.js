import React from "react";
import { NavLink } from "react-router-dom";
import { Switch } from "@mui/material"

function NavBar({loggedUser, onLogOut}) {
  return (
    <nav id="header-nav">
      <p>C°/F°</p><Switch />
      <p>Dark mode</p><Switch />
      {!loggedUser 
       ? null
       : (
        <>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/manage-account">
            Account Management
          </NavLink>
          <NavLink onClick={onLogOut} to="/">
            Logout
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
