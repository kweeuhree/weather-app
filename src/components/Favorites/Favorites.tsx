import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { HeartIcon } from '../index';
import { City } from "../../types";

import './favoritesStyles.css'


type Props = {
  setCurrentCity: (city: City) => void;
  units: number;
  favoriteCities: City[];
  toggleFavs: (city: City, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}


export const Favorites: React.FC<Props> = ({ setCurrentCity, units, favoriteCities, toggleFavs }) => {

  // onclick display current favorite location inside card component
  const handleClick = (city: City) => {
    setCurrentCity(city);
  }

  const citiesJSX = favoriteCities && favoriteCities.map((city: City, index: number) => (
    <ListItem key={index} className='chip'>
        <div onClick={()=> handleClick(city)} className="display-grid full-width">
          <div>{city?.current?.location.name}</div> 
          <div>{city?.current?.current[`feelslike_${units}`]}</div>
        </div>
      
        <ListItemButton onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> toggleFavs(city, event)}>
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

 