import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";
import ModalComponenet from "./ModalComponent";

function Tile({ city, onUnlike, measuringSystem }) {
  const [fetchedCity, setFetchedCity] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  function imperialOrMetric() {
    if (measuringSystem) {
      return "metric";
    } else {
      return "imperial";
    }
  }

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const cityName = city.name;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/weather?q=${cityName}&APPID=${
        process.env.REACT_APP_API_KEY
      }&units=${imperialOrMetric()}`
    ).then((r) => {
      if (r.ok) {
        r.json().then((weather) => {
          setFetchedCity(weather);
          setLoaded(true);
        });
      }
    });
  }, [measuringSystem]);

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
          <ModalComponenet
            city={city}
            cityWeather={fetchedCity}
            handleClose={handleClose}
            open={open}
            onUnlike={onUnlike}
            measuringSystem={measuringSystem}
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
              <span>&#176;</span>
              {!measuringSystem ? "F" : "C"}
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
              <span>&#176;</span> L:{fetchedCity.main.temp_min}°
            </Typography>
          </CardContent>
        </div>
      ) : (
        <p>Loading!</p>
      )}
    </Card>
  );
}

export default Tile;
