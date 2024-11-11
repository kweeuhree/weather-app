import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { IoHeartSharp } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import { useDrawer, useFavoriteCities, useWeatherData } from "./hooks";
import { Favorites, Button, Form, Loading } from "./components";
import {
  getData as fetchWeatherData,
  reducer,
  isCityFavorite,
  getFontColor,
} from "./utils";
import { City, ToggleFavsEvent } from "./types";

const Preview = lazy(() => import("./components/Preview/Preview"));
const Details = lazy(() => import("./components/Details/Details"));

import "./App.css";

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

export const App: React.FC = () => {
  const { data: weatherData, error, isFetching } = useWeatherData();
  const { favoriteCities, toggleFavs } = useFavoriteCities();
  const { drawer, toggleDrawer } = useDrawer();
  const [state, dispatch] = useReducer(reducer, { units: "f" });
  const [currentCity, setCurrentCity] = useState<City>();

  useEffect(() => {
    if (weatherData) {
      setCurrentCity({
        current: weatherData.currentData,
        forecast: weatherData.forecastData,
      });
    }
  }, [weatherData]);

  const setUserSearch = useCallback(async (searchTerm: string) => {
    try {
      const { currentData, forecastData } = await fetchWeatherData({
        city: searchTerm,
      });

      // return in case of invalid input
      if (currentData === null || forecastData === null) {
        alert("Invalid input");
        return;
      } else {
        setCurrentCity({
          current: currentData,
          forecast: forecastData,
        });
      }
    } catch (error) {
      console.error(
        `Failed to set city according to user search. Error: ${error}`
      );
    }
  }, []);

  const handleToggleFavs = useCallback(
    (event: ToggleFavsEvent) => {
      if (currentCity) {
        toggleFavs(currentCity, event);
      }
    },
    [currentCity, toggleFavs]
  );

  // Memoize style to avoid unnecessariy recalculation
  const heartStyle = useMemo(() => {
    return currentCity?.current?.location &&
      isCityFavorite(currentCity, favoriteCities)
      ? "red-heart"
      : "";
  }, [currentCity, favoriteCities]);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading weather data</div>;
  }

  return (
    <Box className="App">
      <Drawer
        anchor="right"
        open={drawer.favoriteCities}
        onClose={toggleDrawer("favoriteCities", false)}
        sx={{ "& .MuiDrawer-paper": drawerStyles }}
      >
        <Favorites
          setCurrentCity={setCurrentCity}
          units={state.units}
          favoriteCities={favoriteCities}
          toggleFavs={toggleFavs}
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

      <main>
        <Suspense fallback={<Loading />}>
          {currentCity?.current?.location && (
            <Preview currentCity={currentCity} units={state.units} />
          )}
        </Suspense>

        <div className="display-flex flex-space flex-column">
          <Form setUserSearch={setUserSearch} />

          <div className="display-flex flex-space gap-1rem pd-block-15rem pd-inline-15rem">
            {/* toggle c/f */}
            <Button
              type="submit"
              ariaLabel="Toggle degree units"
              onClick={() => dispatch({ type: "TOGGLE_UNITS" })}
            >
              <span className={getFontColor("f", state.units)}>F</span>
              <span>/</span>
              <span className={getFontColor("c", state.units)}>C</span>
            </Button>

            {/* add to favorites */}
            <Button
              type="submit"
              ariaLabel="Add To Favorite Locations"
              onClick={handleToggleFavs}
            >
              <IoHeartSharp className={heartStyle} />
            </Button>
          </div>
        </div>

        <Suspense fallback={<Loading />}>
          {currentCity?.current?.location && (
            <Details currentCity={currentCity} units={state.units} />
          )}
        </Suspense>
      </main>
    </Box>
  );
};
