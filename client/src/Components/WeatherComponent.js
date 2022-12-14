import React from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Modal,
  IconButton,
  CardContent,
  Container,
  Backdrop,
  Fade,
  Grid,
  CircularProgress
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
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

function WeatherComponent({
  weatherReport,
  myCities,
  onLikeOrUnlike,
  open,
  handleClose,
  measuringSystem,
  loading
}) {
  const { dt, timezone, weather, main, wind, sys, name } = weatherReport;
  // console.log(new Date(dt * 1000 - timezone * 1000)); // minus
  // console.log(new Date(dt * 1000 + timezone * 1000)); // plus
  let inMyCities = false;
  let cityId = null;
  function isInMyCities() {
    for (let i = 0; i < myCities.length; i++) {
      if (name === myCities[i].name) {
        inMyCities = true;
        cityId = myCities[i].id;
      }
    }
    return false;
  }

  const date = new Date(dt * 1000 - timezone * 1000); // minus
  const date1 = new Date(dt * 1000 + timezone * 1000).toLocaleDateString(); // plus

  isInMyCities();

  function handleLikeClick() {
    fetch("/api/tiles", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newLikedCity) => onLikeOrUnlike(newLikedCity));
      }
    });
  }

  function handleUnlike() {
    fetch(`/api/tiles/${cityId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((removedTile) => onLikeOrUnlike(removedTile));
      }
    });
  }

  return (
    <div>
    {loading ? (
      <Grid item xs={6}>
        <CircularProgress />
      </Grid>
    ) : (
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
                !inMyCities ? (
                  <IconButton onClick={handleLikeClick} aria-label="settings">
                    <FavoriteIcon sx={{ color: "gray" }} />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleUnlike} aria-label="settings">
                    <FavoriteIcon sx={{ color: "red" }} />
                  </IconButton>
                )
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
                  {!measuringSystem ? "F" : "C"}
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
                justifyContent="center"
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
              <FiveDaysWeather cityName={name} measuringSystem={measuringSystem}/>
            </CardContent>
          </Card>
        </Container>
      </Fade>
    </Modal>
    )}
    </div>
  );
}

export default WeatherComponent;
