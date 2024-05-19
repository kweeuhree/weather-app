import React from 'react';
import { IoHeartOutline } from "react-icons/io5";


const Favorites = ({ setFavoriteCities, favoriteCities, units }) => {

const toggleFavs = (city) => {
  setFavoriteCities(prevFavoriteCities => prevFavoriteCities.filter((item) => item.location.name !== city.location.name));

  console.log('favorite cities inside favorites ', favoriteCities);
}
  const citiesJSX = favoriteCities.map((item, index) => {
    return (
      <div key={index}>{item.location.name} - {item.current[`feelslike_${units}`]} 
      <span style={{color: 'red'}} onClick={()=>toggleFavs(item)}>
        <IoHeartOutline />
      </span>
    </div>
    )
  })

  return (
    <div>{citiesJSX}</div>
  )
}

export default Favorites;