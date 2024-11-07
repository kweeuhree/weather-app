export const isCityFavorite = (city, favoriteCities) => {
  if (!city.current.location) return false;

    return favoriteCities.some(
      item => item.current.location.lat === city.current.location.lat && item.current.location.lon === city.current.location.lon
    );
  }
  
export const filterFavoriteCities = (city, favoriteCities) => {
    return favoriteCities.filter(
      (item) =>
        item.current.location.lat !== city.current.location.lat ||
        item.current.location.lon !== city.current.location.lon
    );
  }