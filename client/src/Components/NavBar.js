import React from "react";
import { NavLink } from "react-router-dom";


function NavBar({loggedUser, onLogOut}) {
  return (
    <nav id="header-nav">
      {!loggedUser 
       ? null
       : (
        <>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/my-cities">
            My Cities
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
