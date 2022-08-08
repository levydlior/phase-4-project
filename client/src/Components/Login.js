import React, { useState } from "react";
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material'

const initialForm = {
  username: "",
  password: "",
}

function Login({ onCreateOrLog, responseFromAccountOrLogged }) {
  const [loginAccount, setLoginAccount] = useState(initialForm);
  const [errors, setErrors] = useState(null);

  function handleLoginChange(e) {
    const target = e.target.name;
    const value = e.target.value;
    setLoginAccount({ ...loginAccount, [target]: value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(loginAccount),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setErrors(null);
          setLoginAccount(initialForm);
          onCreateOrLog(user);
        });
      } else {
        r.json().then((err) => {
          setLoginAccount(initialForm);
          setErrors(err);
        });
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
      {!responseFromAccountOrLogged ? (
        <>
          <Typography component="h1" variant="h5">
            Sign In:
          </Typography>
          
          <Box component='form' >
            <TextField
              margin="normal"
              name="username"
              type="text"
              label="Username"
              required
              fullWidth
              value={loginAccount.username}
              onChange={handleLoginChange}
            />
            <TextField
              margin="normal"
              name="password"
              type="password"
              label="Password"
              required
              fullWidth
              value={loginAccount.password}
              onChange={handleLoginChange}
            />
            {errors ? <p>{errors.error}</p> : null}
            <Button 
            onClick={handleLoginSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >Sign In</Button>
            <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            <Grid container>
              <Grid item>
                <Link href="/create-account" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>

            </Grid>
          </Box>
        </>
      ) : (
        <h2>Welcome!</h2>
      )}
      </Box>
    </Container>
  );
}

export default Login;
