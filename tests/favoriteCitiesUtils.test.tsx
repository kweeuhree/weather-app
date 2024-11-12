import { expect, describe, test } from "vitest";

import {
  isCityFavorite,
  filterFavoriteCities,
} from "../src/utils/favoriteCitiesUtils";
import {
  newYorkCity,
  favoriteCitiesExcludingNewYork,
  favoriteCitiesIncludingNewYork,
} from "../mocks";

const emptyArray = [];

describe("Favorite cities utility functions", () => {
  test("correctly defines a city as favorite", () => {
    const isFavorite = isCityFavorite(
      newYorkCity,
      favoriteCitiesIncludingNewYork
    );
    expect(isFavorite).toBe(true);
  });

  test("correctly defines a city as not favorite", () => {
    const isFavorite = isCityFavorite(
      newYorkCity,
      favoriteCitiesExcludingNewYork
    );
    expect(isFavorite).toBe(false);
  });

  test("correctly filters favorite cities array", () => {
    const filteredCities = filterFavoriteCities(
      newYorkCity,
      favoriteCitiesExcludingNewYork
    );
    expect(filteredCities).not.toContain(newYorkCity);
  });

  test("returns false when checking if a city is a favorite in an empty array", () => {
    const isFavorite = isCityFavorite(newYorkCity, emptyArray);
    expect(isFavorite).toBe(false);
  });

  test("returns empty array when filtering cities from an empty array", () => {
    const filteredCities = filterFavoriteCities(newYorkCity, emptyArray);
    expect(filteredCities).toEqual([]);
  });
});
