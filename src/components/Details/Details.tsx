import { useRef } from 'react';

import { GiSunrise, GiSunset  } from "react-icons/gi";
import { WiHot, WiRaindrops, WiWindy, WiUmbrella } from "react-icons/wi";

import Grid2 from "@mui/material/Grid2";

import './detailsStyles.css';

const hourlyJSX = (hour, units) => {
  const currentTime = new Date().getHours();
  const displayHours = hour.slice(currentTime);

  const itemRefs = useRef([]);

  return (
    displayHours.map(({ condition: { icon, text }}, index) => {
      const displayHour = currentTime + index;

      const focusRef = (el) => {
        itemRefs.current[index] = el;
        // Focus the first element in the array
        if (index === 0 && el) {
          el.focus();
          
          el.scrollIntoView({
            behavior: 'smooth', 
            block: 'center',   
          });
        }
      };

      return (
        <div key={index} className='full-width'>
          <li
            className="display-flex flex-evenly gap-1rem plain-li"
            ref={focusRef}
            tabIndex="-1" // Set `tabIndex` so the element can be focused
          >
            <div>
              {displayHour < 10 && '0'}{displayHour}:00 {displayHour < 12 ? 'AM' : 'PM'}
            </div>
            
            <em>
             {hour[displayHour][`feelslike_${units}`]}
            </em>

            <div>
              <img src={icon} alt={text} />
            </div>
          </li>
          <hr />
        </div>
      );
    })
  );
};

const dailyJSX = (day, units) => {
  return (
      <div className='display-flex flex-center card pd-1rem'>
        <div>         
          Average daytime temp: {day[`avgtemp_${units}`]}
        </div>
      
        <div>
          <img src={day.condition.icon} alt={day.condition.text} />
        </div>
      </div>
  );
}

const sunriseSunsetJSX = ({ sunrise, sunset }) => (
  <Grid2 container spacing={4} className='card'>
    <div className="display-flex flex-space flex-column pd-inline-15rem pd-block-15rem">
      <div>Rise: {sunrise}</div>
      <span className="font-5rem"><GiSunrise /></span>
    </div>
    <div className="display-flex flex-space flex-column pd-inline-15rem pd-block-15rem">
      <span className="font-5rem"><GiSunset /></span>
      <div>Set: {sunset}</div>
    </div>
  </Grid2>
);


export const Details = ({ currentCity, units }) => {
    if(!currentCity.current) return;

    const { current, forecast } = currentCity;
    const { current: currentWeather } = current;
    const { uv, wind_dir, precip_in } = currentWeather;

    const { location, forecast:  { forecastday } } = forecast;
    const { hour, day, astro } = forecastday[0]; 

    const weatherDetails = {
      UV: {
        details: uv,
        icon: WiHot,
      },
      Humidity: {
        details: day.avghumidity,
        icon: WiRaindrops
      },
      'Wind direction': {
        details: wind_dir,
        icon: WiWindy,
      },
      'Rain, inch': {
        details: precip_in,
        icon: WiUmbrella,
      }
    }

  return (
    <div className="display-flex flex-center flex-column">
      
      <div className="display-flex flex-center full-width">
          <ul className="hourly-list display-flex flex-center flex-column full-width">{hourlyJSX(hour, units)}</ul>
      </div>

      <Grid2 container spacing={2} className="display-flex flex-center full-width">
          <div 
            className="display-flex flex-center">
              {dailyJSX(day, units)}
          </div>
          <div 
            className="display-flex flex-center flex-column full-width">
              {sunriseSunsetJSX(astro)}
          </div> 
      </Grid2>

      <div className="display-flex flex-center flex-column full-width gap-1rem pd-block-1rem">
        {Object.entries(weatherDetails).map(([text, { details, icon: Icon }]) => (
          <div key={text} className="display-flex flex-space card width-90">
            <div className="display-flex flex-space width-90 pd-inline-1rem">
              <span>{text}:</span>
              <span>{details}</span>
            </div>
            <span className="font-5rem"><Icon /></span>
          </div>
        ))}
      </div>
    </div>
  );
};


