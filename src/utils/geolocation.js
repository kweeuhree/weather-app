const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(showPosition(position)),
          (error) => reject(showError(error))
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };
  
  const showPosition = (position) => {
    const latitude = (position.coords.latitude).toFixed(4);
    const longitude = (position.coords.longitude).toFixed(4);
    console.log("Latitude: " + latitude + " Longitude: " + longitude);
    return { latitude, longitude };
  };
  
  const showError = (error) => {
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
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  };
  
  export const getCoordinates = () => {
    return getUserLocation()
      .then((coords) => coords)
      .catch((error) => {
        console.error('Error getting location:', error);
        throw error;
      });
  };
  

  