import { WiDegrees } from "react-icons/wi";
import type { City } from "../../types";


type Props = {
  currentCity?: City;
  units: string;
}

const Preview: React.FC<Props> = ({ currentCity, units }) => {
    if(!currentCity?.current?.location || !currentCity.forecast?.location) return;

    const { current, forecast } = currentCity;
    const { location: { name, country } } = forecast;

    const { current: currentWeather } = current;
    const { condition: { icon, text }, feelslike_c, feelslike_f } = currentWeather;

    const temperature = units === 'c' ? feelslike_c : feelslike_f;

  return (
    <div className="display-flex flex-center flex-column pd-block-15rem">
      
      <span>
        <h3 className="margin-b-0">{name}</h3>
        <span>{country}</span>
      </span>

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

export default Preview;