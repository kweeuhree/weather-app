import React, { useState } from 'react';

const Form = ({ props }) => {

  const [formData, setFormData] = useState({searchTerm: ''});
  
  const handleChange = (event) => {
    // update form data
    setFormData({...formData, searchTerm: event.target.value})
  };

  const handleSubmit = (event) => {
    // update props
    event.preventDefault();
    props.userSearch = formData.searchTerm;
  };

  return (
      <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} placeholder='find a city'/>
          <input type="submit" value="Find" />
       </form>
  )
}

export default Form;