
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'
import { CardHeader } from "@mui/material";
import { IconButton, IconButtonProps } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite'
import { CardActions } from "@mui/material";

import {CardContent} from "@mui/material";
import Container from '@mui/material/Container';

function WeatherComponent({ weatherReport }) {
  

    const {dt, timezone, weather, main, wind, sys, name} = weatherReport

const date = new Date(dt*1000-(timezone*1000)); // minus 
const date1= new Date(dt*1000+(timezone*1000)).toLocaleDateString(); // plus

console.log(date1)

    return (
      <Container component="main" maxWidth="sm">
        <Card sx={{
            marginTop: 8,
          }}>
          <CardHeader 
           action={
            <IconButton aria-label="settings">
              <FavoriteIcon />
            </IconButton>
          }
          subheader={date1}
          />
        <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box p={1}>
              <Typography variant="h4" color="textPrimary">
                {name}, {sys.country}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h2" color="textPrimary">
                {main.temp}
                <span>&#176;</span>
                {"F"}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h5" color="textPrimary">
               {weather[0].main}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h5" color="textPrimary">
               H:{main.temp_max}<span>&#176;</span> L:{main.temp_min}<span>&#176;</span>
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h7" color="textPrimary">
                Humidity: {main.humidity} %
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h7" color="textPrimary">
                pressure: {main.pressure} pa
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h7" color="textPrimary">
                wind: {wind.speed} mp/h
              </Typography>
            </Box>

        </CardContent>
        </Card>
      </Container>
    )
}

export default WeatherComponent;