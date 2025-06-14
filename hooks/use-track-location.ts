"use client";

import { useState } from "react";

type PositionType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [latLong, setLatLong] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong(`${longitude},${latitude}`);
    setIsFindingLocation(false);
    setLocationErrorMessage("");

    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMessage("Impossible de déterminer votre emplacement");

    console.log("Impossible de déterminer votre emplacement");
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMessage(
        "La géolocalisation n'est pas supportée par votre navigateur"
      );
      console.log(
        "La géolocalisation n'est pas supportée par votre navigateur"
      );
    } else {
      console.log("Localisation…");
      setIsFindingLocation(true);
      setLocationErrorMessage("");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
    isFindingLocation,
    latLong,
    locationErrorMessage,
  };
};

export default useTrackLocation;
