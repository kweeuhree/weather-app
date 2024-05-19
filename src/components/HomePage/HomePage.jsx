import React, { useState, useEffect, useReducer } from 'react';
import { getCoordinates } from '../../utils/geolocation';
import { IoHeartOutline } from "react-icons/io5";
import Card from '../Card/Card';
import Button from '../Button/Button';
import Favorites from '../Favorites/Favorites';
import Form from '../Form/Form';



const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_UNITS':
      return {
        ...state,
        units: state.units === 'f' ? 'c' : 'f' // toggle temperatures
      };  
    default: 
      return state; // return unchanged state by default
    }
};


const HomePage = () => {

  const [currentCity, setCurrentCity] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [heartColor, setHeartColor] = useState('black'); //set initial heart color to black
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lon: null
  });

  const [state, dispatch] = useReducer(reducer, {
    units: 'f',
  });

  const api_key = import.meta.env.VITE_WEATHER_API;
  const api_query = `?key=${api_key}`;
  const baseUrl = `http://api.weatherapi.com/v1/current.json`;
  const forecastUrl = `http://api.weatherapi.com/v1//forecast.json`;

  useEffect(() => {
    setHeartColor('black'); // on re-render, change color to black 
  },[currentCity]);

   // default display is user location city, fetch once
   useEffect(() => {
    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      fetchWeatherData({ lat: coordinates.lat, lon: coordinates.lon });
    }
  }, [coordinates]);

  useEffect(() => {
    if (userSearch) {
      fetchWeatherData({ city: userSearch });
    }
  }, [userSearch]);

  const fetchCoordinates = async () => {
    try {
      const response = await getCoordinates();
      const { latitude, longitude } = await response;
      console.log('fetched following coordinates: ', latitude, longitude);
      setCoordinates({ lat: latitude, lon: longitude });
    } catch (error) {
      console.error('failed inside fetchCoordinates:', error);
    }
  };

  const fetchWeatherData = async (location) => {
    try {
      let weatherData;
      if (location.lat && location.lon) {
        weatherData = await fetchWeather(baseUrl, location.lat, location.lon);
      } else if (location.city) {
        weatherData = await fetchWeather(baseUrl, location.city);
      }

      if (weatherData) {
        setCurrentCity(weatherData);
      }
    } catch (error) {
      console.error('error inside fetchWeatherData:', error);
    }
  };

  // fetch weather function
  const fetchWeather = async (url, ...args) => {
    console.log('attempting fetching weather');

    let fetchAllUrl = '';
    const [arg1, arg2] = args;

    if ( args.length === 2 ) {
      fetchAllUrl = `${url}${api_query}&q=${args[0]},${args[1]}`; // default location url
    } else if ( args.length === 1 ) {
      fetchAllUrl = `${url}${api_query}&q=${args[0]}`; // user search url
    } else {
      console.log('failed inside fetchWeather');
      return;
    }
    
    // fetch and return data
    try {
      const response = await fetch(fetchAllUrl);
      const data = await response.json();
      console.log('data inside fetchWeather ', data);
      if(data.error) {
        alert('invalid input');
        return false;
      }
      return data;

    } catch (error) {
      console.log('error inside fetchWeather ', error);
    }
  };

  const handleAddToFavs = () => {
    if(favoriteCities.length === 5) {
      alert('cant add any more locations');
      return;
    }
    const found = favoriteCities.find((item) => item.location.lat === currentCity.location.lat && item.location.lon === currentCity.location.lon);
  
    if (found) {
      // remove currentCity from favoriteCities
      setFavoriteCities(prevFavoriteCities => prevFavoriteCities.filter((item) => item !== currentCity));
      setHeartColor('black');
    } else {
      // add currentCity to favoriteCities
      setFavoriteCities(prevFavoriteCities => prevFavoriteCities.concat(currentCity));
      setHeartColor('red');
    }
  };
  
  

  return (
    <main>

      <section className="favorite-section">
          <Favorites heartColor={heartColor} setHeartColor={setHeartColor} currentCity={currentCity} setFavoriteCities={setFavoriteCities} favoriteCities={favoriteCities} units={state.units} />
      </section>
      
      <section className='input-section'>       
        <Form setUserSearch={setUserSearch} />
      </section>

    <section className="card-section">
              
        <Card currentCity={currentCity} units={state.units} />

        <div className="button-container">
          {/* toggle c/f */}
          <Button 
            type={<><span style={{color: state.units === 'f' ? 'red' : 'white'}}>F</span>/<span 
            style={{color: state.units === 'c' ? 'red' : 'white'}}>C</span></>} 
            onClick={()=>{dispatch({ type: 'TOGGLE_UNITS' })}} 
          /> 
          {/* add to favorites */}
          <Button 
            type={<span style={{ color: heartColor }}><IoHeartOutline /></span>}  
            aria-label="Add To Favorite Locations" 
            onClick={handleAddToFavs} 
          />
          {/* home */}
          {/* <Button type={'See Your Locations'} onClick={handleDisplayFavs}/> */}
        </div>

    </section>

    </main>
  );
};

export default HomePage;