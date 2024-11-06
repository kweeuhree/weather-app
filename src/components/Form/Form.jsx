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
      <form className="display-flex flex-center" onSubmit={handleSubmit}>
          <input name='input' type="text" placeholder='enter city or zip code'/>
          <Button type="submit">Find</Button>
       </form>
  )
}

