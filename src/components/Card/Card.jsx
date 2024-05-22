import React, { useEffect } from 'react';
import { GiSunrise, GiSunset  } from "react-icons/gi";
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
          <div>humidity: {forecastday[0].day.avghumidity}</div>
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
            <div>set: {forecastday[0].astro.sunset}</div>
            <GiSunrise className="sun-icon" />
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

                    <div className="square-card linear-gradient uv">uv: {currentWeather.uv}</div>
                    <div className="square-card linear-gradient aiq">air quality: {forecastday[0].day.air_quality}</div>
        
                    <div className="square-card linear-gradient wind">wind direction: {currentWeather.wind_dir}</div>
                    <div className="square-card linear-gradient rain">rain, inch: {currentWeather.precip_in}</div>
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
