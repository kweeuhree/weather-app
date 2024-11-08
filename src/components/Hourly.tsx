import { useRef } from "react";

import type { HourData } from "../types";


type Props = {
    hour: HourData[]; 
    units: string;
  }
  
  
export const Hourly: React.FC<Props> = ({ hour, units }) => {
  
    const currentTime = new Date().getHours();
    const displayHours = hour.slice(currentTime);
  
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  
    return (
      displayHours.map(({ condition: { icon, text }}, index: number) => {
        const displayHour = currentTime + index;
  
        const focusRef = (el: HTMLLIElement | null) => {
          itemRefs.current[index] = el;
          // Focus the first element in the array
          if (index === 0 && el) {
            el.focus(); 
          }
        };
  
        return (
          <div key={index} className='full-width'>
            <li
              className="display-flex flex-evenly gap-1rem plain-li"
              ref={focusRef}
              tabIndex={-1} // Set `tabIndex` so the element can be focused
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