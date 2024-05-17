import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Favorites from '../Favorites/Favorites';
import { getCoordinates } from '../../utils/geolocation';
import { buttons } from '../../models/data';


const HomePage = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: '',
    lon: ''
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
        console.log('fetched following coordinates: ', latitude, longitude);
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
      } catch (error) {
        console.log('error inside fetchWeather ', error);
      }
    if(coordinates) {
      fetchWeather();
    }
    }
}, [coordinates]);
  
  
  


  return (
    <main>

      <section className="favorite-section">
          <Favorites favoriteCities={favoriteCities} />
      </section>

    <section className="card-section">
              
        <Card currentCity={currentCity} />

        <div className="button-container">
          {/* toggle c/f */}
          <Button type={buttons.cf.type} action={()=>handleClick(buttons.cf.action)} thisClass={buttons.cf.thisClass} /> 
          {/* open input to change city */}
          <Button type={buttons.pickCity.type} action={()=>handleClick(buttons.pickCity.action)} thisClass={buttons.pickCity.thisClass} />
          {/* add to favorites */}
          <Button type={buttons.addToFavorites.type} action={()=>handleClick(buttons.addToFavorites.action)} thisClass={buttons.addToFavorites.thisClass} />
          {/* home */}
          <Button type={buttons.home.type} action={()=>handleClick(buttons.home.action)} thisClass={buttons.home.thisClass} />
        </div>

    </section>

    </main>
  );
};

export default HomePage;