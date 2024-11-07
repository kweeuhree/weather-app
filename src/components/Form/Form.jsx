import TextField from '@mui/material/TextField';

import { Button } from "../Button";

export const Form = ({ setUserSearch }) => {

  const handleSubmit = (event) => {
    // update props
    event.preventDefault();
    const searchTerm = event.target.elements.namedItem('input').value;

    setUserSearch(searchTerm);
    
    event.target.reset();
  };

  return (
      <form className="display-flex flex-center gap-1rem" onSubmit={handleSubmit}>
          <TextField name='input' type="text" placeholder='Enter city or zip code' variant="filled"/>
          <Button type="submit">Find</Button>
       </form>
  )
}

