"use client";

import useTrackLocation from "@/hooks/use-track-location";
import { CoffeeStoreType } from "@/types";
import { useEffect, useState } from "react";
import Banner from "./banner.client";
import Card from "./card.server";

export default function NearbyCoffeeStores() {
  const {
    handleTrackLocation,
    isFindingLocation,
    latLong: longLat,
    locationErrorMessage,
  } = useTrackLocation();
  const [coffeeStores, setCoffeeStores] = useState([] as CoffeeStoreType[]);

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const coffeeStoresByLocation = async () => {
      if (longLat) {
        try {
          const response = await fetch(
            `/api/coffee-stores?longLat=${longLat}&limit=10`
          );
          const data = await response.json();
          setCoffeeStores(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des cafés:", error);
        }
      }
    };

    coffeeStoresByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={
          isFindingLocation ? "Localisation…" : "Voir les cafés à proximité"
        }
      />
      {locationErrorMessage && (
        <p className="text-red-500">Erreur: {locationErrorMessage}</p>
      )}

      {coffeeStores.length > 0 && (
        <div className="mt-10">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Magasins à proximité
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((coffee: CoffeeStoreType, idx: number) => (
              <Card
                key={`${coffee.name}-${coffee.id}`}
                name={coffee.name}
                imgUrl={coffee.imgUrl}
                href={`/coffee-store/${coffee.id}?id=${idx}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
