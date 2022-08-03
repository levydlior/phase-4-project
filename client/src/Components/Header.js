import React from "react";
import NavBar from "./NavBar";

function Header({ loggedUser, onLogOut, measuringSystem, onMeasuringChange }) {
  return (
    <header id="header">
      <div id="logo-and-title">
        <img
          id="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1nyV8qa04YxsdlaBSIjKF8vVC7vWcm5cM7w&usqp=CAU"
          alt="Website logo"
        />
        <h1>sxc flatweather app</h1>
      </div>
      <NavBar loggedUser={loggedUser} onLogOut={onLogOut} measuringSystem={measuringSystem} onMeasuringChange={onMeasuringChange}/>
    </header>
  );
}

export default Header;
