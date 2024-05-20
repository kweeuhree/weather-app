import React, { useState } from 'react';
import './FormStyle.css';

const Form = ({ setUserSearch }) => {

  const [formData, setFormData] = useState({searchTerm: ''});
  
  const handleChange = (event) => {
    // update form data
    setFormData({...formData, searchTerm: event.target.value})
  };

  const handleSubmit = (event) => {
    // update props
    event.preventDefault();
    setUserSearch(formData.searchTerm);
    console.log(formData.searchTerm, ' inside handleSubmit in form component');
    event.target.reset();
  };

  return (
      <form className='my-form' onSubmit={handleSubmit}>
          <input className='input-input'type="text" onChange={handleChange} placeholder='enter city or zip code'/>
          <input className='input-submit' type="submit" value="Find" />
       </form>
  )
}

export default Form;