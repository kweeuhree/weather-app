import { useState, useEffect, useReducer, Suspense } from 'react';

import { IoHeartOutline } from "react-icons/io5";

import { Favorites, Button, Form, Preview, Details, Loading } from './components';

import { 
  fetchCoordinates,
  fetchWeatherData,
  reducer, 
  useFavoriteCities
} from './utils';

import './App.css';


function App() {
  const { favoriteCities, toggleFavs } = useFavoriteCities();
  const [state, dispatch] = useReducer(reducer, {units: 'f'});
  const [currentCity, setCurrentCity] = useState({
    current: null,
    forecast: null
  });


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

  return (
    <div>

      <section className="display-flex flex-center">
          <Favorites setCurrentCity={setCurrentCity} units={state.units} favoriteCities={favoriteCities} toggleFavs={toggleFavs}/>
      </section>

      <main>
  
        <Suspense fallback={<Loading />}>
          <Preview currentCity={currentCity} units={state.units} />
        </Suspense>
         
         <Form setUserSearch={setUserSearch} />

          <div className="display-flex flex-center">
              {/* toggle c/f */}
              <Button 
                type='submit'
                ariaLabel="Toggle degree units" 
                onClick={()=>{dispatch({ type: 'TOGGLE_UNITS' })}} 
              >
                <span className={farenheightFontColor}>
                  F
                </span>/
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
                <IoHeartOutline />
              </Button>

          </div>

          <Suspense fallback={<Loading />}>
            <Details currentCity={currentCity} units={state.units} />
          </Suspense>
         

        </main>


    </div>
  )
}

export default App;
