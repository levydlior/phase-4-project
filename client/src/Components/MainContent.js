import React, {useEffect, useState} from 'react'
import SearchComponent from './SearchComponent'
import WeatherComponent from './WeatherComponent'

function MainContent() {
  const [city, setCity] = useState([])
  const [weather, setWeather] = useState([])
  const [hasCity, setHasCity] = useState(false)


  const handleCitySearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=940fcac699ff529fe9e0a4a0de433a1c&units=imperial`
    )
      .then(res => res.json())
      .then(res => setWeather(res))
      .then(setHasCity(true))
    }

  const renderWeather = hasCity ? <WeatherComponent weatherReport={weather}/> : null

  return (
    <main id='main-page-main'>
      <h2>MainContent</h2>
       <SearchComponent setCity={setCity} onCitySearch={handleCitySearch}/>
       {renderWeather}
    </main>

   
    
  )
}

export default MainContent