import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCoordinates } from "../utils";

/**
 * This hook uses the `useSuspenseQuery` from React Query.
 * Fetches weather data based on user location.
 */
export function useWeatherData() {
  return useSuspenseQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetchCoordinates(),
  });
}
