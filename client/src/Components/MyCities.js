import React from "react";
import Tile from "./Tile";

function MyCities({myCities, onUnlike}) {


  const tilesList = myCities.map((city) => {
    return <Tile city={city} key={city.name} onUnlike={onUnlike}/>;
  });

  return <div id="my-cities-page">{tilesList}</div>;
}

export default MyCities;
