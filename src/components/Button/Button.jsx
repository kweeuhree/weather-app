import React from 'react';

const Button = ({ type,onClick,  thisClass }) => {
  return (
    <button className={`${thisClass}`} onClick={onClick}>{type}</button>
  );
};

export default Button;