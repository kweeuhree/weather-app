import { WiDegrees } from "react-icons/wi";


export const Preview = ({ currentCity, units }) => {
    if(!currentCity.current) return;

    const { current, forecast } = currentCity;
    const { location: { name } } = forecast;

    const { current: currentWeather } = current;
    const { condition: { icon, text }, feelslike_c, feelslike_f } = currentWeather;

    const temperature = units === 'c' ? feelslike_c : feelslike_f;

  return (
    <div className="display-flex flex-center flex-column pd-block-15rem">
      
      <h3>{name}</h3>

      <div className="display-flex flex-center">
          
          <div>
              <img src={icon} alt={text} />
          </div>

          <div>
            {temperature}
              <WiDegrees />
          </div>

      </div>

      <div>{text}</div>

    </div>
  )
}
