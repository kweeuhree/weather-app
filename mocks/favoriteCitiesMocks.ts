import { losAngeles, london, newYorkCity } from "./favoriteCitiesMockData";
import type { City } from "../src/types";

// Mock favorite cities array without New York
export const favoriteCitiesExcludingNewYork: City[] = [losAngeles, london];

// Mock favorite cities array with New York
export const favoriteCitiesIncludingNewYork: City[] = [
  newYorkCity,
  losAngeles,
  london,
];
