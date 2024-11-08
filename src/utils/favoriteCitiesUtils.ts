import type { City } from "../types";

export const isCityFavorite = (city: City, favoriteCities: City[]) => {

    return favoriteCities.some(
      item => item?.current?.location.lat === city.current.location.lat && item?.current?.location.lon === city.current.location.lon
    );
  }
  
export const filterFavoriteCities = (city: City, favoriteCities: City[]) => {
    return favoriteCities.filter(
      (item) =>
        item?.current?.location.lat !== city.current.location.lat ||
        item?.current?.location.lon !== city.current.location.lon
    );
  }