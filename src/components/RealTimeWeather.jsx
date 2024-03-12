import React, { useState, useEffect } from 'react';
import { getRealTimeWeather } from '../services/realTimeWeatherService';
import '../RealTimeWeather.css';
import weatherIcon from '../assets/weather-icon.png';

const RealTimeWeather = ({ latitude, longitude, location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getRealTimeWeather(latitude, longitude, location);
        setWeatherData(data.data.values);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, location]);

  if (loading) return <p>Loading real-time weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return null;

  return (
    <div className="real-time-weather-container"> 
      <div className="weather-icon">
        <img src={weatherIcon} alt="Weather Icon" />
      </div>
      <div className="weather-info">
        <p className="temperature">{weatherData.temperature}°C</p> 
        <p className="humidity">Humidity: {weatherData.humidity}%</p> 
      </div>
    </div>
  );
};

export default RealTimeWeather;
