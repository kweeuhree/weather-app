import React from 'react';

const Card = ({ currentCity, units }) => {
  console.log('current units inside card: ', units);

  const loaded = () => {
    try {
      return (
        <div className='card-container'>
          {currentCity && currentCity.location && (
            <>
              <div className="name">{currentCity.location.name}</div>

              <div className="temperature">
              {currentCity.current[`feelslike_${units}`]}

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

  const main = () => {
    try{
      return currentCity === null ? loaded() : loading();
    } catch (error) {
      console.log(error);
      loading();
    };
  };

  return main();
};

export default Card;
