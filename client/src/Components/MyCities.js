import React from "react";
import Tile from "./Tile";

function MyCities({ myCities, onUnlike, measuringSystem }) {
  const tilesList = myCities.map((city) => {
    return (
      <Tile
        city={city}
        key={city.name}
        onUnlike={onUnlike}
        measuringSystem={measuringSystem}
      />
    );
  });

  return <div id="my-cities-page">{tilesList}</div>;
}

export default MyCities;
