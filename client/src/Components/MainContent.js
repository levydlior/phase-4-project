import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import WeatherComponent from "./WeatherComponent";


function MainContent({myCities}) {
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState([]);
  const [hasCity, setHasCity] = useState(false);


  const handleCitySearch = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=imperial`
    ).then((r) => {
      if (r.ok) {
        r.json().then((res) => {
          setWeather(res);
          setHasCity(true);
          setCity("")
        });
      }
    });
  };

  const renderWeather = hasCity ? (
    <WeatherComponent weatherReport={weather} myCities={myCities}/>
  ) : (
    <></>
  );

  return (
    <main id="main-page-main">
      <SearchComponent city={city} setCity={setCity} onCitySearch={handleCitySearch} />
      {renderWeather}
    </main>
  );
}

export default MainContent;
