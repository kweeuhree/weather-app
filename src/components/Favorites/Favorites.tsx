import { useState } from "react";

import { IoHeartOutline, IoHeartSharp  } from "react-icons/io5";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import './favoritesStyles.css'

const HeartIcon = () => {
  const [hover, setHover] = useState(false);
  
  return (
    <ListItemIcon 
    className="display-flex flex-center" 
    onMouseEnter={() => setHover(true)} 
    onMouseLeave={() => setHover(false)}
  >
   {
    hover 
    ? <IoHeartOutline className="red-heart" />
    : <IoHeartSharp className="red-heart"/>}
  </ListItemIcon>
  )
}


export const Favorites = ({ setCurrentCity, units, favoriteCities, toggleFavs }) => {

// onclick display current favorite location inside card component
const handleClick = (city) => {
  setCurrentCity(city);
}

  const citiesJSX = favoriteCities.map((city, index) => (
    <ListItem key={index} className='chip'>
        <div onClick={()=> handleClick(city)} className="display-grid full-width">
          <div>{city.current.location.name}</div> 
          <div>{city.current.current[`feelslike_${units}`]}</div>
        </div>
      
        <ListItemButton onClick={(event)=> toggleFavs(city, event)}>
          <HeartIcon />
        </ListItemButton>
    </ListItem>
    ))

  return (
    <div className='fav-location-container full-height'>
      {
        citiesJSX.length > 0 
        ? <List 
            className="full-height display-flex flex-center flex-column gap-1rem">
              {citiesJSX}
          </List>
        : (
        <div className="display-flex flex-center flex-column pd-1rem white-font full-height">
          <strong>Your favorite cities will appear here</strong>
          <p>Click the heart icon to add cities to your favorites list.</p>
        </div>
        )
      }
    </div>
  )
}

 