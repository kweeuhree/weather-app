import { GiSunrise, GiSunset  } from "react-icons/gi";
import { WiHot, WiRaindrops, WiWindy, WiUmbrella } from "react-icons/wi";

import './detailsStyles.css';

const hourlyJSX = (hour, units) => {
  return (
    hour.map(( { condition: { icon, text }}, index) => (
      <li className="plain-li" key={index}>
        <div>
          {index}:00 {index < 12 ? 'AM' : 'PM'}
        </div>
        
        <div>
          {hour[`feelslike_${units}`]}
        </div>
  
        <div>
          <img src={icon} alt={text} />
        </div>
      </li>
    ))
)}

const dailyJSX = (day, units) => {
  return (
      <>
        <div>         
          average daytime temp: {day[`avgtemp_${units}`]}
        </div>
      
        <div>
          <img src={day.condition.icon} alt={day.condition.text} />
        </div>
      </>
  );
}

const sunriseSunsetJSX = ({ sunrise, sunset }) => (
  <>
    <div>
      <div>rise: {sunrise}</div>
      <GiSunrise />
    </div>
    <div>
      <GiSunset />
      <div>set: {sunset}</div>
    </div>
  </>
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
      
      <div className="display-flex flex-center max-width">
          <ul className="display-flex flex-center no-overflow">{hourlyJSX(hour, units)}</ul>
      </div>

      <div className="display-flex flex-center">
          <div 
            className="display-flex flex-center width-50">
              {dailyJSX(day, units)}
          </div>
          <div 
            className="display-flex flex-center flex-column width-50">
              {sunriseSunsetJSX(astro)}
          </div> 
      </div>

      <div>
        {Object.entries(weatherDetails).map(([text, { details, icon: Icon }]) => (
          <div key={text}>
            <span>{text}:</span>
            <span>{details}</span>
            <span><Icon /></span>
          </div>
        ))}
      </div>
    </div>
  );
};


