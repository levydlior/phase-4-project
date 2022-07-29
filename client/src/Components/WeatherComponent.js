
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CardContent} from "@mui/material";
import Container from '@mui/material/Container';

function WeatherComponent({ weatherReport }) {
  

    const {coord, weather, main, wind, sys, name} = weatherReport

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
                {name}, {}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h4" color="textPrimary">
                Temp: {}
                <span>&#176;</span>
                {"F"}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h5" color="textPrimary">
               {}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                Humidity: {} %
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                pressure: {} pa
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                wind: {} mp/h
              </Typography>
            </Box>

        </CardContent>
      </Container>
    )
}

export default WeatherComponent;