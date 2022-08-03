import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import WeatherComponent from "./WeatherComponent";
import MyCities from "./MyCities"

function MainContent({myCities, onLikeOrUnlike, measuringSystem}) {
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState([]);
  const [hasCity, setHasCity] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  function imperialOrMetric(){
    if(measuringSystem){
      return 'metric'
    }else {
      return 'imperial'
    }
  }

  const handleCitySearch = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=${imperialOrMetric()}`
    ).then((r) => {
      if (r.ok) {
        r.json().then((res) => {
          setWeather(res);
          setHasCity(true);
          setCity("")
        });
      }
    });
   setOpen(true);
  };

  const renderWeather = hasCity ? (
    <WeatherComponent weatherReport={weather} myCities={myCities} onLikeOrUnlike={onLikeOrUnlike} open={open} handleClose={handleClose} measuringSystem={measuringSystem}/>
  ) : (
    <></>
  );

  return (
    <main id="main-page-main">
      <SearchComponent city={city} setCity={setCity} onCitySearch={handleCitySearch}/>
      {renderWeather}
      <MyCities myCities={myCities} onUnlike={onLikeOrUnlike} measuringSystem={measuringSystem}/>
    </main>
  );
}

export default MainContent;
