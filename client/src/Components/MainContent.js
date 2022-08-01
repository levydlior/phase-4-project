import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import WeatherComponent from "./WeatherComponent";


function MainContent() {
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState([]);
  const [hasCity, setHasCity] = useState(false);

  console.log(process.env.REACT_APP_API_KEY)

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
    <WeatherComponent weatherReport={weather} />
  ) : (
    <p>loading!</p>
  );

  return (
    <main id="main-page-main">
      <SearchComponent city={city} setCity={setCity} onCitySearch={handleCitySearch} />
      {renderWeather}
    </main>
  );
}

export default MainContent;
