import React, { useState, useEffect } from "react";
import { Button, TextField, FormLabel, Container } from "@mui/material";

function ManageAccount({
  handleLogOut,
  onBackToMain,
  loggedUser,
  onInfoChange,
}) {
  const initialForm = {
    username: loggedUser.username,
    password: "",
    verify: "",
  };

  console.log(loggedUser.id);
  const [form, setForm] = useState(initialForm);
  const [exception, setException] = useState(null);
  const [editForm, setEditForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password === form.verify) {
      const updateObj = { username: form.username, password: form.password };
      fetch(`/users/${loggedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updateObj),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            onInfoChange(user);
            setForm({...initialForm, username: user.username});
            setException(null);
            setEditForm(false);

          });
        } else {
          resp.json().then((data) => {
            setException(data);
          });
        }
      });
    } else {
      setException({ errors: "passwords don't match!" });
    }
  };
  const handleDelete = () => {
    fetch("/users/1", { method: "DELETE" });
    handleLogOut();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    onBackToMain();
  }, []);

  return (
    <>
      {editForm ? (
        <Container sx={{ pt: 2 }} maxWidth="xs" onChange={handleInput}>
          {exception ? (
            <FormLabel>{exception.errors}</FormLabel>
          ) : (
            <FormLabel>Enter new username and/or password to update</FormLabel>
          )}
          <TextField
            name="username"
            type="text"
            fullWidth
            label="New username"
            value={form.username}
            sx={{ mt: 3 }}
          />
          <TextField
            name="password"
            type="password"
            fullWidth
            label="New password"
            value={form.password}
            sx={{ mt: 1 }}
          />
          <TextField
            name="verify"
            type="password"
            fullWidth
            label="Verify password"
            value={form.verify}
            sx={{ mt: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 5 }}
            onClick={handleSubmit}
          >
            Update user info
          </Button>
        </Container>
      ) : (
        <Container sx={{ pt: 2 }} maxWidth="xs" onChange={handleInput}>
          <h3>User name: {loggedUser.username}</h3>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 5 }}
            onClick={() => setEditForm(true)}
          >
            Update username and password
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleDelete}
            color="error"
          >
            Delete user
          </Button>
        </Container>
      )}
    </>
  );
}

export default ManageAccount;
