import { useState, useEffect } from 'react';
import RealTimeWeather from './components/RealTimeWeather';
import ForecastWeather from './components/ForecastWeather';
import LocationInput from './components/LocationInput';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Fetch user's current location when component mounts
    const fetchUserLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        const city = await getCityName(position.coords.latitude, position.coords.longitude);
        setLocation(city);
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    fetchUserLocation();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.tomorrow.io/v4/weather/apiKey=52eaB0a1vE1SOEijwjHGNTVMDqzC6Ln7&location=${latitude},${longitude}`);
      const data = await response.json();
      return data.location.name;
    } catch (error) {
      console.error('Error fetching city name:', error);
      return '';
    }
  };

  const handleLocationSubmit = (location) => {
    setLocation(location);
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Weather Info</h1>
      <div className="content-container">
        <h2 className="location-heading">{location}</h2>
        <LocationInput onLocationSubmit={handleLocationSubmit} />
        {(latitude && longitude) || location ? (
        <>
        <div className="weather-container">
          <RealTimeWeather latitude={latitude} longitude={longitude} location={location}/>
        </div>
        <div className="weather-container">
          <ForecastWeather latitude={latitude} longitude={longitude} location={location}/>
        </div>
        </>
        ) : (
          <p>Please allow location access or enter a city name to get weather data.</p>)}
      </div>
    </div>
  );
}

export default App;
