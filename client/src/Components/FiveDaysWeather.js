import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Avatar } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function FiveDaysWeather({ cityName }) {
  const [loading, setLoading] = useState(true);
  const [fiveDaysForecast, setFiveDaysForecast] = useState([]);

  function getNeeded(fetchedObject, newArray) {
    for (let i = 0; i < fetchedObject.length; i++) {
      if (i === 6 || i === 14 || i === 22 || i === 30 || i === 38) {
        newArray.push(fetchedObject[i]);
      }
    }
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
    ).then((r) => {
      if (r.ok) {
        r.json().then((forecast) => {
          let neededForecast = [];
          getNeeded(forecast.list, neededForecast);
          setFiveDaysForecast(neededForecast);
          setLoading(false);
        });
      }
    });
  }, []);

  const fiveDaysWeatherList = fiveDaysForecast.map((day) => {
    console.log(day)
    const date1 = new Date(day.dt_txt).toLocaleDateString();
    return (
      <Grid item xs={6} alignContent='flex-start' alignItems='flex-start' justify='flex-start'>
        <Item>{date1}</Item>
        <Item>
         <img src= {`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          alt=""
        />
       </Item>
        <Item>H:{day.main.temp_max}<span>&#176;</span>F</Item>
        <Item>L:{day.main.temp_min}<span>&#176;</span>F</Item>
      </Grid>
    );
  });

  return (
    <div>
      <h3 align="center">5 Day Forecast:</h3>
      <Box >
      <Grid  
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={{ xs: 2, md: 4 }} 
        columns={{ xs: 6, sm: 12, md: 30 }}
        >
        {loading ? (
          <Grid item xs={6}>
            <CircularProgress />
          </Grid>
        ) : (
             fiveDaysWeatherList 
        )}
      </Grid>
      </Box>
    </div>
  );
}

export default FiveDaysWeather;
