import axios from 'axios';

const API_KEY = '52eaB0a1vE1SOEijwjHGNTVMDqzC6Ln7';
const API_URL = 'https://api.tomorrow.io/v4/weather/realtime';

export const getRealTimeWeather = async (latitude, longitude, location) => {
  let response;
  try {
    if(!location) {
      response = await axios.get(`${API_URL}?apikey=${API_KEY}&location=${latitude},${longitude}`);
    }
    else {
      response = await axios.get(`${API_URL}?apikey=${API_KEY}&location=${location}`);
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch real-time weather data');
  }
};




