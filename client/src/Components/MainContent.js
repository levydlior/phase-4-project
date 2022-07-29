import React, {useEffect, useState} from 'react'
import SearchComponent from './SearchComponent'

function MainContent() {
  const [city, setCity] = useState([])
  const [weather, setWeather] = useState([])


  const handleCitySearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=940fcac699ff529fe9e0a4a0de433a1c`
    )
      .then(res => res.json())
      .then(res => setWeather(res))
    }
console.log(weather)

  return (
    <main id='main-page-main'>
      <h2>MainContent</h2>
      
       <SearchComponent setCity={setCity} onCitySearch={handleCitySearch}/>
    </main>

   
    
  )
}

export default MainContent