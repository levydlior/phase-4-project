import React, { useEffect, useState } from "react";

import { Card, CardContent, Button, Typography, CardActions, CardMedia, Backdrop, Box, Modal, Fade } from "@mui/material";
import ModalComponenet from "./ModalComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Tile({ city, onUnlike }) {
  const [fetchedCity, setFetchedCity] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const cityName = city.name;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/weather?q=${cityName}&APPID=${process.env.REACT_APP_API_KEY}&units=imperial`
    ).then((r) => {
      if (r.ok) {
        r.json().then((weather) => {
          setFetchedCity(weather);
          setLoaded(true);
        });
      }
    });
  }, []);

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
    <Card
      className="tile"
      sx={{ maxWidth: 600, maxHeight: 200 }}
      onClick={handleOpen}
    >
      {loaded ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {/* <CardMedia component="img"
          height="100%"
          width="100%"
          image="https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg"
          alt="weather"/> */}
          <ModalComponenet
            cityWeather={fetchedCity}
            handleClose={handleClose}
            open={open}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="left" variant="h4">
              {cityName}
            </Typography>
            <Typography align="right" variant="h4">
              {fetchedCity.main.temp}
              <span>&#176;</span>F
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography variant="body2">
              H:{fetchedCity.main.temp_max}
              <span>&#176;</span> L:{fetchedCity.temp_min}
              <span>&#176;</span>
            </Typography>
            <Typography variant="body2">{fetchedCity.main.temp}</Typography>
          </CardContent>
          <Button onClick={handleUnlike} variant="contained">
            Remove
          </Button>
        </div>
      ) : (
        <p>Loading!</p>
      )}
    </Card>
  );
}

export default Tile;
