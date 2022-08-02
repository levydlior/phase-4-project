import React, { useState } from "react";
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from "@mui/material"

const initialForm = {
  username: "",
  password: "",
}

function CreateAnAccount({ onCreateOrLog, responseFromAccountOrLogged }) {
  const [createAccountForm, setCreateAccountForm] = useState(initialForm);
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
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(createAccountForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setErrors(null);
          setCreateAccountForm(initialForm);
          onCreateOrLog(user);
        });
      } else {
        r.json().then((err) => {
          setCreateAccountForm(initialForm);
          setErrors(err);
        });
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >{!responseFromAccountOrLogged ? (<>
          <Typography component="h1" variant="h5">
            Create An Account:
          </Typography>
            <Box component='form' noValidate onSubmit={handleCreateSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    type="text"
                    fullWidth
                    required
                    label="Username"
                    value={createAccountForm.username}
                    onChange={handleCreateChange}
                  />
                </Grid>
                  {errors ? <p>{errors.errors}</p> : null}
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    type="password"
                    fullWidth
                    required
                    label="Password"
                    value={createAccountForm.password}
                    onChange={handleCreateChange}
                  />
                </Grid>
              </Grid>
              <Button 
                type="submit" 
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
        </>
      ) : (
        <>
          <h2>Account created - Welcome!</h2>
        </>
      )}
      </Box>
    </Container>
  );
}

export default CreateAnAccount;
