import TextField from "@mui/material/TextField";

import { Button } from "../Button";

import "./formStyles.css";

type Props = {
  setUserSearch: (searchTerm: string) => void;
};

export const Form: React.FC<Props> = ({ setUserSearch }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchTerm = (form.elements.namedItem("input") as HTMLInputElement)
      .value;

    setUserSearch(searchTerm);

    form.reset();
  };

  return (
    <form className="display-flex flex-center gap-1rem" onSubmit={handleSubmit}>
      <TextField
        name="input"
        type="text"
        placeholder="Enter city or zip code"
        variant="filled"
      />
      <Button ariaLabel="Click to find a city" type="submit">
        Find
      </Button>
    </form>
  );
};
