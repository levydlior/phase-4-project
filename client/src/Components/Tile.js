import React, { useEffect, useState } from "react";
 

function Tile({ city }) {
  const [fetchedCity, setFetchedCity] = useState({});
  const [loaded, setLoaded] = useState(false);
  const cityName = city.name;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apikey}&units=imperial`
    )
      .then((r) => r.json())
      .then((weather) => {
        setFetchedCity(weather);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="tile">
      {loaded ? (
        <>
          <h2>{cityName}</h2>
          <p>current temp: {fetchedCity.main.temp}</p>
          <p>{fetchedCity.sys.country}</p>
        </>
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
}

export default Tile;
