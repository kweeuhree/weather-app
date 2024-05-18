import React, { useState, useEffect, useReducer } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Favorites from '../Favorites/Favorites';
import Form from '../Form/Form';
import { useNavigate } from 'react-router-dom';
import { getCoordinates } from '../../utils/geolocation';


const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_UNITS':
      return {
        ...state,
        units: state.units === 'f' ? 'c' : 'f' // toggle temperatures
      };
    case 'ADD_TO_FAVORITES':
      console.log('adding to favorites: ', action.payload);
      return {
        ...state,
        addToFavorites: [...state.addToFavorites, action.payload.location.name]
      };
    
    default: 
      return state; // return unchanged state by default
    }
};


const HomePage = () => {

  const [currentCity, setCurrentCity] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [userSearch, setUserSearch] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: '',
    lon: ''
  });

  const [state, dispatch] = useReducer(reducer, {
    units: 'f',
    addToFavorites: []
  });

  const navigate = useNavigate();

  const api_key = import.meta.env.VITE_WEATHER_API;
  const api_query = `?key=${api_key}`;
  const baseUrl = `http://api.weatherapi.com/v1/current.json`;

  // default display is user location city, fetch once
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const { latitude, longitude } = await getCoordinates();
        // console.log('fetched following coordinates: ', latitude, longitude);
       setCoordinates({
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

  // get weather once coordinates are fetched
  useEffect(() => {
    const fetchWeather = async () => {
      if (!coordinates.lat || !coordinates.lon) return;

      try {
        const weatherData = await getWeather(coordinates.lat, coordinates.lon);
        setCurrentCity(weatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  }, [coordinates]);
  

  const getWeather = async (lat, lon) => {
    console.log('attempting fetching weather');
    const fetchAllUrl = `${baseUrl}${api_query}&q=${lat},${lon}`; // full url

    // fetch and return data
    try {
      const response = await fetch(fetchAllUrl);
      const data = await response.json();
      console.log('data inside getWeather ', data);
      return data;

    } catch (error) {
      console.log('error inside getWeather ', error);
    }
  };


  return (
    <main>

      <section className="favorite-section">
          <Favorites favoriteCities={favoriteCities} />
      </section>

      <section className='input-section'>       
        <Form userSearch={userSearch} />
      </section>

    <section className="card-section">
              
        <Card currentCity={currentCity} units={state.units} />

        <div className="button-container">
          {/* toggle c/f */}
          <Button type={"C/F"} onClick={()=>{dispatch({ type: 'TOGGLE_UNITS' })}} /> 
          {/* add to favorites */}
          <Button type={"Add To Favorites"} onClick={()=>{dispatch({ type:'ADD_TO_FAVORITES', payload: currentCity })}} />
          {/* home */}
          <Button type={'home'} onClick={() => navigate('/home')}/>
        </div>

    </section>

    </main>
  );
};

export default HomePage;