import React, { useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import CreateAnAccount from "./Components/CreateAnAccount";
import Login from "./Components/Login";
import "./App.css";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  function handleLogOut(e) {
    e.preventDefault();
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setLoggedUser(null);
      }
    });
  }

  function handleCreateOrLog(user) {
    setLoggedUser(user);
  }

  console.log(loggedUser);

  return (
    <div>
      <header>
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/create-account">
            Create an account
          </NavLink>
          <NavLink exact to="/login">
            Login
          </NavLink>
          <NavLink onClick={handleLogOut} to="/">
            Logout
          </NavLink>
        </nav>
      </header>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create-account">
          <CreateAnAccount onCreateOrLog={handleCreateOrLog} />
        </Route>
        <Route exact path="/">
          Home
        </Route>
        <Route exact path="*">
          404 Error Not Found
        </Route>
      </Switch>
    </div>
  );
}

export default App;
