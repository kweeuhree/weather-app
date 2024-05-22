import React, { useEffect } from 'react';
import { GiSunrise, GiSunset  } from "react-icons/gi";
import { WiHot, WiRaindrops, WiWindy, WiUmbrella } from "react-icons/wi";

import TopSegment from '../TopSegment/TopSegment';
import './CardStyle.css';

const Card = ({ currentCity, units }) => {
  console.log('current units inside card: ', units);
  console.log(currentCity);

  const loaded = () => {
    try {

      const { current, forecast } = currentCity;
      const { current: currentWeather } = current;
      const { location, forecast:  { forecastday } } = forecast;

      // const currentHour = new Date.getHours();

      const hourlyJSX = forecastday[0].hour.map((item, index) => (
        <li key={index}>
          <div className='time'>{index}:00 {index < 12 ? 'AM' : 'PM'}</div>
          <div>{item[`feelslike_${units}`]}</div>
          <div>
            <img src={item.condition.icon} alt={item.condition.text} />
          </div>
        </li>
      ))

      const dailyJSX = (
        <div className='daily'>
        <div className='daily-text'>         
         <div>average daytime temp: {forecastday[0].day[`avgtemp_${units}`]}</div>
        </div>
        
        <div className='daily-icon'>
          <img src={forecastday[0].day.condition.icon} alt={forecastday[0].day.condition.text} />
        </div>
        </div>
      );

      const sunriseSunsetJSX = (
        <div className='sunset-sunrise-container'>

          <div className="sun-section"> 
              <div>rise: {forecastday[0].astro.sunrise}</div>
              <GiSunrise className="sun-icon" />
          </div>

          <div className="sun-section">
            <GiSunset className="sun-icon" />
            <div>set: {forecastday[0].astro.sunset}</div>
          </div>
        </div>
      );
      

      return (
        <div className='card-container'>

            <div className='card'>

                {/* top section */}
                <TopSegment units={units} location={location} currentWeather={currentWeather} />

                {/* bottom section */}

              <div className="bottom-segment">
                  {/* bottom section left */}
                  
                <div className='bottom-section left-bottom-section'>
        
                    <div className="hourly linear-gradient">
                      <ul>{hourlyJSX}</ul>
                    </div>
               
  
                    <div className="linear-gradient">
                    <ul>{dailyJSX}</ul>
                    </div>

                    <div className="sun-container">
                      <div className="linear-gradient">{sunriseSunsetJSX}</div>
                    
                    </div>
    

                </div>

                  {/* bottom section right */}
                <div className='bottom-section right-bottom-section'>
                  
                  <div className="squares-container">

                    <div className="square-card linear-gradient uv">
                      <span className='background-icon'><WiHot /></span>
                      <span className='square-card-text'>uv: {currentWeather.uv}</span>
                      </div>
                    <div className="square-card linear-gradient humidity">
                    <span className='background-icon'><WiRaindrops /></span>
                      <span className='square-card-text'>humidity: {forecastday[0].day.avghumidity}</span>
                      
                    </div>
                    <div className="square-card linear-gradient wind">
                    <span className='background-icon'><WiWindy /></span>
                      <span className='square-card-text'>wind direction: {currentWeather.wind_dir}</span>
                    </div>
                    <div className="square-card linear-gradient rain">
                       <span className='background-icon'><WiUmbrella /></span>
                      <span className='square-card-text'> rain, inch: {currentWeather.precip_in}</span>
                      </div>
                  </div>
                </div>
              </div>


              {/* end of card div */}
            </div>



            {/* end of card container */}
        </div>
      );
    } catch (error) {
      console.log('error inside loaded ', error);
    }
  };

  const loading = () => {
    return <div>Loading...</div>;
  };


  return currentCity ? loaded() : loading();
};

export default Card;
