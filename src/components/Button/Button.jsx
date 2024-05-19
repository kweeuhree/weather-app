import React from 'react';
import './ButtonStyle.css';

const Button = ({ type, onClick }) => {
  return (
    <button onClick={onClick}>{type}</button>
  );
};

export default Button;