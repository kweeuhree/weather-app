import React from 'react';
import './CardStyle.css';

const Card = ({ currentCity, units }) => {
  console.log('current units inside card: ', units);

  const loaded = () => {
    try {
      return (
        <div className='card-container'>
          {currentCity.current && currentCity.current.location && (
            <>
              <div className="name">{currentCity.current.location.name}</div>

              <div className="temperature">
              {currentCity.current.current[`feelslike_${units}`]}

              </div>

            </>
          )}
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
