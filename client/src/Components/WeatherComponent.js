
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CardContent} from "@mui/material";
import Container from '@mui/material/Container';

function WeatherComponent({ weatherReport }) {
  

    const {coord, weather, main, wind, sys, name} = weatherReport

    console.log(weather.main)

    return (
      <Container component="main" maxWidth="xs">
        <CardContent sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box p={1}>
              <Typography variant="h2" color="textPrimary">
                {name}, {sys.country}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h4" color="textPrimary">
                Temp: {main.temp}
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
              <Typography variant="h6" color="textPrimary">
                Humidity: {main.humidity} %
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                pressure: {main.pressure} pa
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                wind: {wind.speed} mp/h
              </Typography>
            </Box>

        </CardContent>
      </Container>
    )
}

export default WeatherComponent;