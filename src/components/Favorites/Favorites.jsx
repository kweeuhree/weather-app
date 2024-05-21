import React from 'react';
import './FavoritesStyle.css';
import { IoHeartOutline } from "react-icons/io5";


const Favorites = ({ setFavoriteCities, favoriteCities, units }) => {
  console.log('favorite cities inside favorites ', favoriteCities);
const toggleFavs = (city) => {
  setFavoriteCities(prevFavoriteCities => prevFavoriteCities.filter((item) => item.current.location.name !== city.current.location.name));

 
}
  const citiesJSX = favoriteCities.map((item, index) => {
    return (
      <div className='fav-location' key={index}>
        {item.current.location.name} - {item.current.current[`feelslike_${units}`]} 
          <span style={{color: 'red'}} onClick={()=>toggleFavs(item)}>
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