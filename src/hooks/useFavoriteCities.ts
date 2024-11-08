import React, { useEffect, useState } from "react";
import { isCityFavorite, filterFavoriteCities } from "../utils/favoriteCitiesUtils";
import type { City } from "../types";


export const useFavoriteCities = () => {
    const [favoriteCities, setFavoriteCities] = useState<City[]>([]);
    
    useEffect(() => {
      const cities = localStorage.getItem('favorite cities');
      if(cities) {
        setFavoriteCities(JSON.parse(cities));
      }
    }, []);

    const toggleFavs = (city: City, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!city) return;
        
        let newFavorites: City[] = [];
        
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