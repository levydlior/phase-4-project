import React from "react";
import { NavLink } from "react-router-dom";
import { Switch } from "@mui/material"

function NavBar({loggedUser, onLogOut, measuringSystem, onMeasuringChange}) {



  function handleMeasuringChange(e){
    onMeasuringChange()

  }



  return (
    <nav id="header-nav">
      <p>F°/C°</p><Switch value={measuringSystem} onChange={handleMeasuringChange}/>
      <p>Dark mode</p><Switch />
      {!loggedUser 
       ? null
       : (
        <>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/manage">
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
