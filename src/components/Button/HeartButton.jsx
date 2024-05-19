import React, { useState, useEffect } from 'react';
import Button from './Button';
import { IoHeartOutline } from "react-icons/io5";

const HeartButton = ({ currentCity, setFavoriteCities, favoriteCities}) => {

const [heartColor, setHeartColor] = useState('black'); //set initial heart color to black

// const toggleFavs = (city) => {
//     setFavoriteCities(prevFavoriteCities => prevFavoriteCities.filter((item) => item.location.name !== city.location.name));
//     // setHeartColor('black');
  
//     console.log('favorite cities inside favorites ', favoriteCities);
//   }

useEffect(() => {
    setHeartColor('black'); // on re-render, change color to black 
  },[currentCity]);

  const handleClick = () => {
    if (favoriteCities.length === 5) {
      alert('Cannot add any more locations');
      return;
    }
  
    const foundIndex = favoriteCities.findIndex(
      (item) =>
        item.location.lat === currentCity.location.lat &&
        item.location.lon === currentCity.location.lon
    );
  
    if (foundIndex !== -1) {
      // Remove currentCity from favoriteCities
      setFavoriteCities((prevFavoriteCities) =>
        prevFavoriteCities.filter(
          (_, index) => index !== foundIndex
        )
      );
    } else {
      // Add currentCity to favoriteCities
      setFavoriteCities((prevFavoriteCities) =>
        prevFavoriteCities.concat(currentCity)
      );
    }
  };
  

  return (
    <Button 
    type={<span style={{ color: favoriteCities.includes(currentCity) ? 'red' : heartColor }}><IoHeartOutline /></span>}  
    aria-label="Add To Favorite Locations" 
    onClick={handleClick} 
    />
  )
}

export default HeartButton;