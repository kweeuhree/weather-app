import React from 'react';

const Button = ({ type, action, thisClass }) => {
  return (
    <button className={`${thisClass}`} onClick={()=>action()}>{type}</button>
  );
};

export default Button;