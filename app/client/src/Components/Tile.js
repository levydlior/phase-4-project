import React, { useEffect, useState } from "react";

function Tile({ city }) {
  const [fetchedCity, setFetchedCity] = useState({});
  const [loaded, setLoaded] = useState(false);
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
    <div className="tile">
      {loaded ? (
        <>
          <h2>{cityName}</h2>
          <p>current temp: {fetchedCity.main.temp}</p>
        </>
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
}

export default Tile;
