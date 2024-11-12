import Drawer from "@mui/material/Drawer";

import { useDrawer } from "../hooks";
import { Favorites, Button } from "./index";
import type { City, ToggleFavsEvent } from "../types";

const drawerStyles = {
  width: {
    xs: "80%",
    sm: "50%",
    md: "30%",
  },
  maxWidth: "100%",
  height: "100%",
  transition: "width 0.3s ease-in-out",
};

type Props = {
  setCurrentCity: (city: City) => void;
  units: number;
  favoriteCities: City[];
  toggleFavs: (city: City, event: ToggleFavsEvent) => void;
};

export const FavoritesDrawer: React.FC<Props> = (props) => {
  const { drawer, toggleDrawer } = useDrawer();

  return (
    <>
      <Drawer
        anchor="right"
        open={drawer.favoriteCities}
        onClose={toggleDrawer("favoriteCities", false)}
        sx={{ "& .MuiDrawer-paper": drawerStyles }}
      >
        <Favorites
          {...props}
          toggleDrawer={toggleDrawer("favoriteCities", false)}
        />
      </Drawer>
      <Button
        type="button"
        ariaLabel="View your favorite cities"
        onClick={toggleDrawer("favoriteCities", true)}
      >
        Favorite cities
      </Button>
    </>
  );
};
