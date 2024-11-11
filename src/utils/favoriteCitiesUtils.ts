import type { City } from "../types";

// Checks if a given city is already in the list of favorite cities based on its coordinates (latitude and longitude)
export const isCityFavorite = (city: City, favoriteCities: City[]) => {

    return favoriteCities.some(
      item => item?.current?.location.lat === city.current.location.lat && item?.current?.location.lon === city.current.location.lon
    );
  }

// Removes a specific city from the list of favorite cities based on its coordinates (latitude and longitude)
export const filterFavoriteCities = (city: City, favoriteCities: City[]) => {
    return favoriteCities.filter(
      (item) =>
        item?.current?.location.lat !== city.current.location.lat ||
        item?.current?.location.lon !== city.current.location.lon
    );
  }