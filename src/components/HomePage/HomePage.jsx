import React, { useState, useEffect, useReducer } from 'react';
import { getCoordinates } from '../../utils/geolocation';
import { IoHeartOutline } from "react-icons/io5";
import Card from '../Card/Card';
import Button from '../Button/Button';
import Favorites from '../Favorites/Favorites';
import Form from '../Form/Form';
import './HomePageStyle.css';



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

  const [currentCity, setCurrentCity] = useState({
    current: null,
    forecast: null
  });
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [heartColor, setHeartColor] = useState('black'); //set initial heart color to black
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lon: null
  });

  const [state, dispatch] = useReducer(reducer, {units: 'f'});

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
      let forecastData;
      if (location.lat && location.lon) {
        weatherData = await fetchWeather(baseUrl, location.lat, location.lon);
        forecastData = await fetchWeather(forecastUrl, location.lat, location.lon);
      } else if (location.city) {
        weatherData = await fetchWeather(baseUrl, location.city);
        forecastData = await fetchWeather(forecastUrl, location.city);
      }

      if (weatherData && forecastData) {
        setCurrentCity({
          current: weatherData,
          forecast:forecastData
        });
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
    if (favoriteCities.length === 5) {
      alert(`Can't add any more locations`);
      return;
    }
    const found = favoriteCities.find(
      item => item.current.location.lat === currentCity.current.location.lat && item.current.location.lon === currentCity.current.location.lon
    );

    if (found) {
      setFavoriteCities(prevFavoriteCities => prevFavoriteCities.filter(item => item.current.location.lat !== currentCity.current.location.lat || item.current.location.lon !== currentCity.current.location.lon));
      setHeartColor('black');
    } else {
      setFavoriteCities(prevFavoriteCities => [currentCity, ...prevFavoriteCities]);
      setHeartColor('red');
    }
  };
  
  

  return (
    <main>

      <section className="favorite-section">
          <Favorites setCurrentCity={setCurrentCity} setFavoriteCities={setFavoriteCities} favoriteCities={favoriteCities} units={state.units} />
      </section>


      {/* card section */}
  <section className="card-section">
              
      <Card currentCity={currentCity} units={state.units} />

      <div className="form-button-container">
          
          <section className='input-section'>       
             <Form setUserSearch={setUserSearch} />
          </section>

        <div className="button-container">
            {/* toggle c/f */}
            <Button 
              type={<><span style={{color: state.units === 'f' ? 'white' : 'black'}}>F</span>/<span 
              style={{color: state.units === 'c' ? 'white' : 'black'}}>C</span></>} 
              onClick={()=>{dispatch({ type: 'TOGGLE_UNITS' })}} 
            /> 
            {/* add to favorites */}
            <Button 
              type={<span style={{ color: heartColor }}><IoHeartOutline /></span>}  
              aria-label="Add To Favorite Locations" 
              onClick={handleAddToFavs} 
            />

        </div>
            {/* home */}
            {/* <Button type={'See Your Locations'} onClick={handleDisplayFavs}/> */}
        </div>
        {/* end of card section */}
    </section>

    </main>
  );
};

export default HomePage;