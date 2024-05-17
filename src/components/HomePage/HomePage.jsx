import React, { useState, useEffect, useReducer } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Favorites from '../Favorites/Favorites';
import { getCoordinates } from '../../utils/geolocation';
import { buttons } from '../../models/data';


const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLEUNITS':
      return state.units === 'f' ? {
        ...state,
        units: 'c'
      } : {
        ...state,
        units: 'f'
      };
    case 'PICKCITY':
      return <div>input</div>;
    case 'addToFavorites':
      return {
        ...state,
        addToFavorites: [...state.addToFavorites, action.payload.currentCity]
      };
    
    default: 
      return state; // return unchanged state by default
    }
};

const HomePage = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: '',
    lon: ''
  });
  const [state, dispatch] = useReducer(reducer, {
    units: 'f',
    pickCity: null,
    addToFavorites: []
  });

  const api_key = import.meta.env.VITE_WEATHER_API;
  const api_query = `?key=${api_key}`;

  const getWeather = async (lat, lon) => {
    const baseUrl = `http://api.weatherapi.com/v1/current.json`;
    console.log('attempting fetching weather');
    try {

      const fetchAllUrl = `${baseUrl}${api_query}&q=${lat},${lon}`;
      const response = await fetch(fetchAllUrl);

      const data = await response.json();
      console.log('data inside getWeather ', data);

      return data;

    } catch (error) {

      console.log('error inside getWeather ', error);
    }
  };

  // default display is location city
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const { latitude, longitude } = await getCoordinates();
        // console.log('fetched following coordinates: ', latitude, longitude);
       setCoordinates({
        ...coordinates, 
        lat: latitude,
        lon: longitude
       });

       console.log('setting coordinates ', coordinates.lat, coordinates.lon);
      } catch (error) {
        console.error('failed inside fetchCoordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeather(coordinates.lat, coordinates.lon);
        setCurrentCity(weatherData);
        console.log(weatherData, 'inside fetchWeather')
      } catch (error) {
        console.log('error inside fetchWeather ', error);
      }
    }
    if(coordinates) {
      fetchWeather();
    }
}, [coordinates]);
  
  
  const  handleClick = (event, action) => {
    action();
  };
  


  return (
    <main>

      <section className="favorite-section">
          <Favorites favoriteCities={favoriteCities} />
      </section>

    <section className="card-section">
              
        <Card currentCity={currentCity} units={state.units} />

        <div className="button-container">
          {/* toggle c/f */}
          <Button type={buttons.cf.type} onClick={()=>{dispatch({ type: 'TOGGLEUNITS' })}} thisClass={buttons.cf.thisClass} /> 
          {/* open input to change city */}
          <Button type={buttons.pickCity.type} onClick={()=>{dispatch({ type:' PICKCITY' })}} thisClass={buttons.pickCity.thisClass} />
          {/* add to favorites */}
          <Button type={buttons.addToFavorites.type} onClick={()=>{dispatch({ type:'addToFavorites' })}} thisClass={buttons.addToFavorites.thisClass} />
          {/* home */}
          <Button type={buttons.home.type} thisClass={buttons.home.thisClass} />
        </div>

    </section>

    </main>
  );
};

export default HomePage;