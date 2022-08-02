import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function FiveDaysWeather({ cityName }) {
  const [loading, setLoading] = useState(true);
  const [fiveDaysForecast, setFiveDaysForecast] = useState([]);

  function getNeeded(fetchedObject, newArray) {
    for (let i = 0; i < fetchedObject.length; i++) {
      if (i === 0 || i === 4 || i === 12 || i === 20 || i === 28 || i === 36) {
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
    const date1= new Date(day.dt_txt).toLocaleDateString();
    return (
        <li>
            <p>{date1}</p> Min of: {day.main.temp_min}<span>&#176;</span>F Max of: {day.main.temp_max}<span>&#176;</span>F
        </li>
    )
  })


  if (loading) return <CircularProgress />;
  return (
    <div>
        <h3>In the next five days it will be:</h3>
  <ul id="five-day-forecast-list">{fiveDaysWeatherList}</ul>
  </div>
  )
}

export default FiveDaysWeather;
