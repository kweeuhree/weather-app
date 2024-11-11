import { IoIosCloseCircleOutline } from "react-icons/io";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { HeartIcon } from '../index';
import { City, ToggleDrawerEvent, ToggleFavsEvent } from "../../types";

import './favoritesStyles.css'


type Props = {
  setCurrentCity: (city: City) => void;
  units: number;
  favoriteCities: City[];
  toggleFavs: (city: City, event: ToggleFavsEvent) => void;
  toggleDrawer: (event: ToggleDrawerEvent) => void;
}


export const Favorites: React.FC<Props> = ({ setCurrentCity, units, favoriteCities, toggleFavs, toggleDrawer }) => {

  // onclick display current favorite location inside card component
  const handleClick = (city: City) => {
    setCurrentCity(city);
  }

  const citiesJSX = favoriteCities && favoriteCities.map((city: City, index: number) => (
    <ListItem key={index} className='chip pointer font-15rem'>
        <div onClick={()=> handleClick(city)} className="display-grid full-width">
          <div>{city.current.location.name}</div> 
          <div>{city.current.current[`feelslike_${units}`]}</div>
        </div>
      
        <ListItemButton onClick={(event) => toggleFavs(city, event)}>
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
          <div onClick={toggleDrawer}>
            <IoIosCloseCircleOutline className="font-3rem pointer" />
          </div>
          <strong>Your favorite cities will appear here</strong>
          <p className="text-center font-15rem">Click the heart icon to add cities to your favorites list.</p>
        </div>
        )
      }
    </div>
  )
}

 