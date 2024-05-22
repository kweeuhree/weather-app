import React from 'react';
import './FavoritesStyle.css';
import { IoHeartOutline } from "react-icons/io5";


const Favorites = ({ setCurrentCity, setFavoriteCities, favoriteCities, units }) => {
  console.log('favorite cities inside favorites ', favoriteCities);

const toggleFavs = (city) => {
  setFavoriteCities(prevFavoriteCities => prevFavoriteCities.filter((item) => item.current.location.name !== city.current.location.name));
}

// when i toggle favorites, i dont want clicked element to be passed into current city


// onclick display current favorite location inside card component
const handleClick = (item) => {
  setCurrentCity(item);
  console.log('setting current city inside favorites handleClick', item);
}

  const citiesJSX = favoriteCities.map((item, index) => {
    return (
      <div className='fav-location' key={index} onClick={()=>handleClick(item)}>
          <span className='fav-location-span'>{item.current.location.name} {item.current.current[`feelslike_${units}`]} </span>
        
          <span className='heart-span' style={{color: 'red'}} onClick={()=>toggleFavs(item)}>
            <IoHeartOutline />
          </span>
    </div>
    )
  })

  return (
    <div className='fav-location-container'>{citiesJSX.length > 0 ? citiesJSX : <span>Your Locations</span>}</div>
  )
}

export default Favorites;