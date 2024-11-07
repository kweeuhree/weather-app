import { useState, useEffect, useReducer, useMemo, Suspense } from 'react';

import { IoHeartSharp } from "react-icons/io5";
import Drawer from '@mui/material/Drawer';

import { Favorites, Button, Form, Preview, Details, Loading } from './components';

import { 
  fetchCoordinates,
  fetchWeatherData,
  reducer, 
  useFavoriteCities,
  isCityFavorite
} from './utils';

import './App.css';
import { Box } from '@mui/material';


function App() {
  const { favoriteCities, toggleFavs } = useFavoriteCities();
  const [state, dispatch] = useReducer(reducer, {units: 'f'});
  const [currentCity, setCurrentCity] = useState({
    current: null,
    forecast: null
  });

  const [drawer, setDrawer] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };


  const initialFetch = async () => {
    const { weatherData, forecastData } = await fetchCoordinates();
    setCurrentCity({
      current: weatherData,
      forecast: forecastData,
    });
  }

   // default display is user location city, fetch once
   useEffect(() => {
    initialFetch();
  }, []);


  const setUserSearch = async (searchTerm) => {
   try {
    const { weatherData, forecastData } = await fetchWeatherData({ city: searchTerm });
    setCurrentCity({
      current: weatherData,
      forecast: forecastData,
    });
   } catch (error) {
    throw new Error(`Failed to set city according to user search. Error: ${error}`);
   }
  }

  const farenheightFontColor = state.units === 'f' ? 'white-font' : 'black-font';
  const celciusFontColor = state.units === 'c' ? 'white-font' : 'black-font';

  const heartStyle = useMemo(() => {
    return currentCity.current?.location && isCityFavorite(currentCity, favoriteCities) && 'red-heart';
  }, [currentCity, favoriteCities]);
  

  return (
    <Box className='App'>

      <Drawer  
        anchor="right"
        open={drawer.favoriteCities} 
        onClose={toggleDrawer('favoriteCities', false)} 

      >
          <Favorites setCurrentCity={setCurrentCity} units={state.units} favoriteCities={favoriteCities} toggleFavs={toggleFavs}/>
      </Drawer>
      <Button type='button' ariaLabel='View your favorite cities' onClick={toggleDrawer('favoriteCities', true)}>Favorite cities</Button>

      <main>
  
        <Suspense fallback={<Loading />}>
          <Preview currentCity={currentCity} units={state.units} />
        </Suspense>
        
          <div className="display-flex flex-space flex-column">
           <>
            <Form setUserSearch={setUserSearch} />
           </>

           <div className='display-flex flex-space gap-1rem pd-block-15rem pd-inline-15rem'>
            {/* toggle c/f */}
            <Button 
                type='submit'
                ariaLabel="Toggle degree units" 
                onClick={()=>{dispatch({ type: 'TOGGLE_UNITS' })}} 
              >
                <span className={farenheightFontColor}>
                  F
                </span>
                <span>/</span>
                <span className={celciusFontColor}>
                  C
                </span>
              </Button>

              {/* add to favorites */}
              <Button 
                type='submit'
                ariaLabel="Add To Favorite Locations" 
                onClick={(event) => toggleFavs(currentCity, event)} 
              >
                <IoHeartSharp className={heartStyle}/>
              </Button>
           </div>

          </div>

          <Suspense fallback={<Loading />}>
            <Details currentCity={currentCity} units={state.units} />
          </Suspense>
         

        </main>

    </Box>
  )
}

export default App;
