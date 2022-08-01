import React, { useEffect, useState } from "react";
import Tile from "./Tile";

function MyCities({myCities}) {


  const tilesList = myCities.map((city) => {
    return <Tile city={city} />;
  });

  return <div id="my-cities-page">{tilesList}</div>;
}

export default MyCities;
