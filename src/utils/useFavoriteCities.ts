import { useEffect, useState } from "react";
import { isCityFavorite, filterFavoriteCities } from "./favoriteCitiesUtils";

export const useFavoriteCities = () => {
    const [favoriteCities, setFavoriteCities] = useState([]);

    useEffect(() => {
      const cities = localStorage.getItem('favorite cities');
      if(cities) {
        setFavoriteCities(JSON.parse(cities));
      }
    }, []);

    const toggleFavs = (city, event) => {
        event.stopPropagation();
        if (!city) return;
        
        let newFavorites = [];
        
        const found = isCityFavorite(city, favoriteCities);
    
        if (found) {
          newFavorites = filterFavoriteCities(city, favoriteCities);
        } else {
          newFavorites = [city, ...favoriteCities];
        }

        setFavoriteCities(newFavorites);
        localStorage.setItem('favorite cities', JSON.stringify(newFavorites));
      };

      return { favoriteCities, toggleFavs };
}