// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

beforeAll(() => {
  // Mock geolocation to simulate a New York location
  global.navigator.geolocation = {
    getCurrentPosition: vi.fn().mockImplementation((success) =>
      success({
        coords: {
          latitude: 40.7128, // Latitude for New York
          longitude: -74.006, // Longitude for New York
        },
      })
    ),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  };
});

window.alert = vi.fn();
