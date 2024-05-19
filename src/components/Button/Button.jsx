import React from 'react';

const Button = ({ type, onClick }) => {
  return (
    <button onClick={onClick}>{type}</button>
  );
};

export default Button;