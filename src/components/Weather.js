import React, { useEffect } from 'react';

const Weather = ({ currentWeather, onWeatherChange }) => {
  useEffect(() => {
    // Adjust pet's mood or health based on the current weather
    switch (currentWeather) {
      case 'sunny':
        // Example: Increase pet's happiness on a sunny day
        onWeatherChange('Happy');
        break;
      case 'rainy':
        // Example: Decrease pet's happiness on a rainy day
        onWeatherChange('Sad');
        break;
      // Add more cases for different weather conditions
      default:
        // Default behavior
        onWeatherChange('Neutral');
        break;
    }
  }, [currentWeather, onWeatherChange]);

  return (
    <div>
      <h2>Weather Conditions</h2>
      <p>Current Weather: {currentWeather}</p>
    </div>
  );
};

export default Weather;
