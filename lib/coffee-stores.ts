import { MapBoxType } from "@/types";

const transformCoffeeData = (
  idx: number,
  result: MapBoxType,
  photos: Array<string>
) => {
  return {
    id: result.id,
    address: result.properties?.full_address || "",
    name: result.properties.name,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  //11.86352%2C-4.77609
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=caf%C3%A9s&proximity=${longLat}&limit=${limit}&access_token=${process.env.MAPBOX_API}`,
      { cache: "force-cache" }
    );

    const photos = await getListOfCoffeeStorePhotos();
    const data = await response.json();
    return data?.features?.map(
      (result: MapBoxType, idx: number) =>
        transformCoffeeData(idx, result, photos) || []
    );
  } catch (error) {
    console.log("Erreur lors de la recuperation des cafés", error);
    return [];
  }
};

export const fetchCoffeeStore = async (id: string, queryId: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${id}&proximity=ip&limit=6&access_token=${process.env.MAPBOX_API}`
    );

    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();
    const transformedData = data?.features?.map(
      (result: MapBoxType) =>
        transformCoffeeData(parseInt(queryId), result, photos) || []
    );

    return transformCoffeeData.length > 0 ? transformedData[0] : {};
  } catch (error) {
    console.log("Erreur lors de la recuperation des cafés", error);
    return {};
  }
};

const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="cafés"&page=1&perPage=10`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return results?.map((result: { urls: any }) => result.urls["small"]);
  } catch (error) {
    console.error("Error retrieving a photo", error);
  }
};
