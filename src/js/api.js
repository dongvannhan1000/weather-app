import { API_KEY, BASE_URL } from './config';

export async function fetchWeatherData(location) {
  const url = `${BASE_URL}/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Weather data not found');
  }
  return response.json();
}