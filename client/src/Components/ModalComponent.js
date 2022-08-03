import React, { useState } from "react";
import {
  Backdrop,
  Modal,
  Fade,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Container,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import FiveDaysWeather from "./FiveDaysWeather";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalComponenet({
  city,
  cityWeather,
  handleClose,
  open,
  onUnlike,
  measuringSystem,
}) {
  const { dt, timezone, weather, main, wind, sys, name } = cityWeather;

  const date1 = new Date(dt * 1000 + timezone * 1000).toLocaleDateString();

  function handleUnlike(e) {
    e.stopPropagation();
    fetch(`/tiles/${city.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((removedTile) => onUnlike(removedTile));
      }
    });
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container component="main" maxWidth="md">
          <Card sx={style}>
            <CardHeader
              action={
                <Button onClick={handleUnlike} variant="contained">
                  Remove
                </Button>
              }
              subheader={date1}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box p={0}>
                <Typography variant="h2" color="textPrimary">
                  {name}, {sys.country}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="h2" color="textPrimary">
                  {main.temp}
                  <span>&#176;</span>
                  {"F"}
                </Typography>
              </Box>
              <Box p={0}>
                <img
                  src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                  alt=""
                />
              </Box>
              <Box p={0}>
                <Typography variant="h5" color="textPrimary">
                  {weather[0].main}
                </Typography>
              </Box>
              <Box p={1}>
                <Typography variant="h5" color="textPrimary">
                  High:{main.temp_max}
                  <span>&#176;</span> Low:{main.temp_min}
                  <span>&#176;</span>
                </Typography>
              </Box>
              <Box
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 2, sm: 4, md: 8 }}
              >
                <Box p={0}>
                  <Typography variant="h7" color="textSecondary">
                    Humidity: {main.humidity} %
                  </Typography>
                </Box>
                <Box p={0}>
                  <Typography variant="h7" color="textSecondary">
                    Pressure: {main.pressure} pa
                  </Typography>
                </Box>
                <Box p={0}>
                  <Typography variant="h7" color="textSecondary">
                    Wind: {wind.speed} mp/h
                  </Typography>
                </Box>
              </Box>
              <FiveDaysWeather
                cityName={name}
                measuringSystem={measuringSystem}
              />
            </CardContent>
          </Card>
        </Container>
      </Fade>
    </Modal>
  );
}

export default ModalComponenet;
