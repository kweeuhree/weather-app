// Retrieves the user's current location using the browser's geolocation API.
// Returns a Promise that resolves with latitude and longitude.
const getUserLocation = (): Promise<{
  lat: string;
  lon: string;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(showPosition(position)),
        (error) => reject(showError(error)),
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

// Processes the geolocation position object and extracts the latitude and longitude.
// Returns an object containing the latitude and longitude as strings.
const showPosition = (position: {
  coords: GeolocationCoordinates;
  timestamp: number;
}): {
  lat: string;
  lon: string;
} => {
  const lat = position.coords.latitude.toFixed(4);
  const lon = position.coords.longitude.toFixed(4);
  return { lat, lon };
};

// Handles geolocation errors by logging appropriate messages based on the error code.
const showError = (error: GeolocationPositionError): void => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    default:
      console.log("An unknown error occurred.");
      break;
  }
};

// Retrieves the user's location coordinates, returning a Promise with latitude and longitude.
// Catches and logs any errors that occur during the geolocation process.
export const getCoordinates = async (): Promise<{
  lat: string;
  lon: string;
}> => {
  return getUserLocation()
    .then((coords) => coords)
    .catch((error) => {
      console.error("Error getting location:", error);
      throw error;
    });
};
