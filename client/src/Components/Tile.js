import React, { useEffect, useState } from "react";

function Tile({ city }) {
  const [fetchedCity, setFetchedCity] = useState({});
  const [loaded, setLoaded] = useState(false)
  const cityName = city.name;

  useEffect(() => {
    if (!loaded){
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=940fcac699ff529fe9e0a4a0de433a1c`
    )
      .then((r) => r.json())
      .then((weather) => {
        setFetchedCity(weather)
        setLoaded(true)
    })}
  }, []);

  console.log(fetchedCity);

  return (
    <div className="tile">
      <h2>{cityName}</h2>
      <p>Current temperature: {fetchedCity.main.temp} </p>
    </div>
  );
}




export default Tile;
