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
    return <Tile city={city} />;
  });



  return <div id="my-cities-page">{tilesList}</div>;
}

export default MyCities;
