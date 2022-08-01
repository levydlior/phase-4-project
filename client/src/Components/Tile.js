import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";


function Tile({ city, onUnlike }) {
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

  
  function handleUnlike(e) {
    e.stopPropagation()
    fetch(`/tiles/${city.id}`, {
      method: "DELETE"
    }).then((r) => {
      if (r.ok) {
        r.json().then((removedTile) => onUnlike(removedTile));
      }
    });
  }


  return (
    <div className="tile">
      {loaded ? (
        <>
          <h2>{cityName}</h2>
          <p>current temp: {fetchedCity.main.temp}</p>
          <IconButton onClick={handleUnlike} aria-label="settings">
                <FavoriteIcon className= "heart-icon" sx={{ color: "red" }} />
              </IconButton>
        </>
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
}

export default Tile;
