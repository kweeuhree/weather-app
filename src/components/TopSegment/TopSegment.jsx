import React from 'react';
import './TopSegmentStyle.css';

const TopSegment = ({ location, units, currentWeather }) => {
  return (
    <div className="top-segment">

    {/* top section left */}
    <div className="top-section left">
        <h3 className="name">{location.name}</h3>
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
  )
}

export default TopSegment;