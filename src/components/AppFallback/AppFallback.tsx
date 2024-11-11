import "./appFallbackStyles.css";

export const AppFallback = () => {
  return (
    <div className="spinner pd-1rem">
      <h2>🌍 Let Us Show You the Weather Nearby</h2>
      <p>Please allow location access to get local weather details.</p>
      <p>Search for specific locations if you'd prefer not to share yours.</p>
    </div>
  );
};
