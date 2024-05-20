import React, { useEffect } from 'react';
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
          <div>{index}:00 {index < 12 ? 'AM' : 'PM'}</div>
          <div>{item[`feelslike_${units}`]}</div>
          <div>
            <img src={item.condition.icon} alt={item.condition.text} />
          </div>
        </li>
      ))

      const dailyJSX = (
        <li>
          <div>{forecastday[0].day[`avgtemp_${units}`]}</div>
          <div>humidity:{forecastday[0].day.avghumidity}</div>
          <div>
          <img src={forecastday[0].day.condition.icon} alt={forecastday[0].day.condition.text} />
          </div>
        </li>
      );

      const sunriseSunsetJSX = (
        <li>
          <div>rise:{forecastday[0].astro.sunrise}</div>
          <div>set:{forecastday[0].astro.sunset}</div>
          <div>
          <img src={forecastday[0].day.condition.icon} alt={forecastday[0].day.condition.text} />
          </div>
        </li>
      );
      

      return (
        <div className='card-container'>

            <div className='card'>

                {/* top section */}
              <div className="top-segment">

                      {/* top section left */}
                  <div className="top-section left">
                        <div className="name">{location.name}</div>
                        <div className="temperature">
                        {currentWeather[`feelslike_${units}`]}
                        </div>
                        <div className='current-condition'>{currentWeather.condition.text}</div>
                  </div>
                       
                       {/* top section right */}
                  <div className="top-section right">
                    <div className="current-condition-icon">
                      <img src={currentWeather.condition.icon} alt={currentWeather.condition.text} />
                    </div>
                  </div>

              </div>

                {/* bottom section */}

              <div className="bottom-segment">
                  {/* bottom section left */}
                <div className='bottom-section left'>
                  <div className="horizontal">
                    <div className="hourly">
                      <ul>{hourlyJSX}</ul>
                      </div>
                  </div>
                  <div className="vertical">
                    <div className="daily">
                    <ul>{dailyJSX}</ul>
                    </div>
                    <div className="sun-buttons-container">
                      <div className="sunset-sunrise-container">{sunriseSunsetJSX}</div>
                      <div className="uv-aiq-container">
                        <div className="square-card uv">uv:{currentWeather.uv}</div>
                        <div className="square-card aiq">air quality: {forecastday[0].day.air_quality}</div>
                      </div>
                    </div>
                  </div>

                </div>

                  {/* bottom section right */}
                <div className='bottom-section right'>
                  <div className="wind-rain-container">
                    <div className="square-card wind">wind direction: {currentWeather.wind_dir}</div>
                    <div className="square-card rain">rain, inch: {currentWeather.precip_in}</div>
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
