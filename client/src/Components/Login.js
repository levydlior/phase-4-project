import React, { useState } from "react";

function Login({ onCreateOrLog, responseFromAccountOrLogged }) {
  const [loginAccount, setLoginAccount] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  function handleLoginChange(e) {
    const target = e.target.name;
    const value = e.target.value;
    setLoginAccount({ ...loginAccount, [target]: value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(loginAccount),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setErrors(null);
          setLoginAccount({ username: "", password: "" });
          onCreateOrLog(user);
        });
      } else {
        r.json().then((err) => {
          setLoginAccount({ username: "", password: "" });
          setErrors(err);
        });
      }
    });
  }

  return (
    <div>
      {!responseFromAccountOrLogged ? (
        <>
          <h2>Login:</h2>
          <form onSubmit={handleLoginSubmit}>
            <input
              name="username"
              type="text"
              required
              value={loginAccount.username}
              onChange={handleLoginChange}
            />
            <input
              name="password"
              type="password"
              required
              value={loginAccount.password}
              onChange={handleLoginChange}
            />
            {errors ? <p>{errors.error}</p> : null}
            <input type="submit" />
          </form>
        </>
      ) : (
        <h2>Welcome!</h2>
      )}
    </div>
  );
}

export default Login;
