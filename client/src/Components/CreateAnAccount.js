import React, { useState } from "react";

function CreateAnAccount({ onCreateOrLog }) {
  const [createAccountForm, setCreateAccountForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  function handleCreateChange(e) {
    const target = e.target.name;
    const value = e.target.value;
    setCreateAccountForm({ ...createAccountForm, [target]: value });
  }

  function handleCreateSubmit(e) {
    e.preventDefault();

    fetch("/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(createAccountForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setErrors(null);
          setCreateAccountForm({ username: "", password: "" });
          onCreateOrLog(user);
        });
      } else {
        r.json().then((err) => {
          setCreateAccountForm({ username: "", password: "" });
          setErrors(err);
        });
      }
    });
  }

  return (
    <div>
      <h2>Create An Account:</h2>
      <form onSubmit={handleCreateSubmit}>
        <input
          name="username"
          type="text"
          required
          value={createAccountForm.username}
          onChange={handleCreateChange}
        />
        {errors ? <p>{errors.errors}</p> : null}
        <input
          name="password"
          type="password"
          required
          value={createAccountForm.password}
          onChange={handleCreateChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateAnAccount;
