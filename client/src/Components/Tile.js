import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { CardMedia } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ModalComponenet from "./ModalComponent";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Tile({ city }) {
  const [fetchedCity, setFetchedCity] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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


  return (
    <Card className="tile" sx={{maxWidth: 600, maxHeight: 200 }} onClick={handleOpen}>
      {loaded ? (
        <>
          {/* <CardMedia component="img"
          height="100%"
          width="100%"
          image="https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg"
          alt="weather"/> */}
          <ModalComponenet cityWeather={fetchedCity} handleClose={handleClose} open={open}/>
          <CardContent sx={{
            display: "flex",
            flexDirection: 'column',
          }}>
          <Typography align='left' variant="h4">{cityName}</Typography>
          <Typography align='right' variant="h4">{fetchedCity.main.temp}<span>&#176;</span>F</Typography>
          </CardContent>
          <CardContent sx={{
            display: "flex",
            flexDirection: 'row',
          }}>
          <Typography variant="body2">H:{fetchedCity.main.temp_max}<span>&#176;</span> L:{fetchedCity.temp_min}<span>&#176;</span></Typography>
          <Typography variant="body2">{fetchedCity.main.temp}</Typography>
          </CardContent>
        </>
      ) : (
        <p>Loading!</p>
      )}
    </Card>
  );
}

export default Tile;
