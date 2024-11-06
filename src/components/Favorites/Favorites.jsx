import { IoHeartOutline } from "react-icons/io5";


export const Favorites = ({ setCurrentCity, units, favoriteCities, toggleFavs }) => {

// onclick display current favorite location inside card component
const handleClick = (city) => {
  setCurrentCity(city);
}

  const citiesJSX = favoriteCities.map((city, index) => {
    return (
      <div className='fav-location' key={index} >
          <span className='fav-location-span' onClick={()=> handleClick(city)}>{city.current.location.name} {city.current.current[`feelslike_${units}`]} </span>
        
          <span className='heart-span' onClick={(event)=> toggleFavs(city, event)}>
            <IoHeartOutline />
          </span>
    </div>
    )
  })

  return (
    <div className='fav-location-container'>{citiesJSX.length > 0 ? citiesJSX : <span>Your Locations</span>}</div>
  )
}

 