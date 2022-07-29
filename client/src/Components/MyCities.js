import React, { useEffect, useState } from "react";
import Tile from "./Tile";

function MyCities() {
  const [myCities, setMyCities] = useState([]);

  useEffect(() => {
    fetch("/cities").then((r) => {
      if (r.ok) {
        r.json().then((cities) => setMyCities(cities));
      }
    });
  }, []);

  const tilesList = myCities.map((city) => {
    return <Tile cityName={city.name} cityId={city.id} />;
  });

  // useEffect(() => {
  //   fetch('/https://api.openweathermap.org/data/2.5/weather?q=San%20Diego&APPID=e29814a14c69b8a0274291687bb9ae09')
  //     .then(r => {
  //       if(r.ok){
  //         r.json(). then (cities => console.log(cities))
  //       }
  //     })
  // },[])

  return <div id="my-cities-page">{tilesList}</div>;
}

export default MyCities;
