import React, { useState, useEffect } from 'react';
import { getForecastWeather } from '../services/forecastWeatherService';
import '../ForecastWeather.css';
import weatherIcon from '../assets/weather-icon.png';

const ForecastWeather = ({ latitude, longitude, location}) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const data = await getForecastWeather(latitude, longitude, location);
        // console.log(data);
        setForecastData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [latitude, longitude, location]);

  if (loading) return <p>Loading forecasted weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!forecastData || !Array.isArray(forecastData)) return null; 

  return (
    <div className="forecast-container">
      {forecastData.map((forecast, index) => (
        <div className="forecast-item" key={index}>
          <div className="weather-info">
            <p className="date" >{forecast.dayName}</p>
            <p>{forecast.date}</p>
            <div className="weather-icon">
              <img src={weatherIcon} alt="Weather Icon" />
            </div>
            <p className="sunrise-sunset">Sunrise: {forecast.sunriseTime} am</p>
            <p className="sunrise-sunset">Sunset: {forecast.sunsetTime} pm</p>
            <div className="temperature-info">
              <p>Max: {forecast.temperatureMax}°C</p>
              <p>Min: {forecast.temperatureMin}°C</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeather;
