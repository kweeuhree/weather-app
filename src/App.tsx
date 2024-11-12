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

import Box from "@mui/material/Box";

import { useFavoriteCities, useWeatherData } from "./hooks";
import { Button, Form, Loading, FavoritesDrawer } from "./components";
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

export const App: React.FC = () => {
  const { data: weatherData, error, isFetching } = useWeatherData();
  const { favoriteCities, toggleFavs } = useFavoriteCities();
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

  const drawerProps = {
    setCurrentCity,
    units: state.units,
    favoriteCities,
    toggleFavs,
  };

  return (
    <Box className="App">
      <FavoritesDrawer {...drawerProps} />

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
