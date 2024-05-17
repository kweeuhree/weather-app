import React from 'react'

const Card = ({ currentCity }) => {
  
  console.log('current city inside card: ', currentCity);

  return (
    <div className='card-container'>
      <div className="temperature">i rendered</div>
    </div>
  )
}

export default Card;