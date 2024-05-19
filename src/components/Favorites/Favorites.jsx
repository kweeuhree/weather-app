import React from 'react';

const Favorites = ({ favoriteCities, units }) => {

  console.log('favorite cities inside favorites ', favoriteCities);

  const citiesJSX = favoriteCities.map((item, index) => {
    return <div key={index}>{item.location.name} - {item.current[`feelslike_${units}`]}</div>
  })

  return (
    <div>{citiesJSX}</div>
  )
}

export default Favorites;