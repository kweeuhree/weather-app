import { useState, useEffect, useReducer, useMemo, useCallback, Suspense, lazy } from 'react';

import { IoHeartSharp } from "react-icons/io5";

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import { useDrawer, useFavoriteCities } from './hooks';
import { Favorites, Button, Form, Loading } from './components';

import { 
  fetchCoordinates,
  fetchWeatherData,
  reducer, 
  isCityFavorite
} from './utils';
import { City } from './types';

import './App.css';

const Preview = lazy(() => import('./components/Preview/Preview'));
const Details = lazy(() => import('./components/Details/Details'));


export const App: React.FC = () => {
  const { favoriteCities, toggleFavs } = useFavoriteCities();
  const { drawer, toggleDrawer } = useDrawer();
  const [state, dispatch] = useReducer(reducer, {units: 'f'});
  const [currentCity, setCurrentCity] = useState<City>();

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


  const setUserSearch = useCallback(
    async (searchTerm: string) => {
      try {
        const { weatherData, forecastData } = await fetchWeatherData({
          city: searchTerm,
        });
        if (weatherData === null || forecastData === null) {
          return;
        } else {
          setCurrentCity({
            current: weatherData,
            forecast: forecastData,
          });
        }
      } catch (error) {
        console.error(`Failed to set city according to user search. Error: ${error}`);
      }
    }, [] 
  );

  const heartStyle = useMemo(() => {
    if(!currentCity?.current?.location) return '';
    return isCityFavorite(currentCity, favoriteCities) ? 'red-heart' : '';
  }, [currentCity, favoriteCities]);
  
  const getFontColor = (unit: string) => state.units === unit ? 'white-font' : 'black-font';

  return (
    <Box className='App'>

      <Drawer  
        anchor="right"
        open={drawer.favoriteCities} 
        onClose={toggleDrawer('favoriteCities', false)} 

      >
          <Favorites setCurrentCity={setCurrentCity} units={state.units} favoriteCities={favoriteCities} toggleFavs={toggleFavs}/>
      </Drawer>
      <Button 
        type='button'   
        ariaLabel='View your favorite cities' 
        onClick={toggleDrawer('favoriteCities', true)}
      >
        Favorite cities
      </Button>

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
              onClick={() => dispatch({ type: 'TOGGLE_UNITS' })}
            >
              <span className={getFontColor('f')}>F</span>
              <span>/</span>
              <span className={getFontColor('c')}>C</span>
            </Button>

              {/* add to favorites */}
              <Button 
                type='submit'
                ariaLabel="Add To Favorite Locations" 
                onClick={currentCity ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => toggleFavs(currentCity, event) : undefined} 
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

