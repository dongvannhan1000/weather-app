import { fetchWeatherData } from './api.js';
import { formatWeatherData } from './weatherDataFormatter.js';

class WeatherService {
  constructor() {
    this.cachedData = null;
    this.lastFetchTime = null;
    this.cacheDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
  }

  async getWeatherData(location) {
    if (this.isCacheValid(location)) {
      return this.cachedData;
    }

    try {
      const rawData = await fetchWeatherData(location);
      const formattedData = formatWeatherData(rawData);
      
      this.updateCache(location, formattedData);
      return formattedData;
    } catch (error) {
      console.error('Error in WeatherService:', error);
      throw error;
    }
  }

  isCacheValid(location) {
    if (!this.cachedData || this.cachedData.location.address !== location) {
      return false;
    }

    const currentTime = new Date().getTime();
    return currentTime - this.lastFetchTime < this.cacheDuration;
  }

  updateCache(location, data) {
    this.cachedData = data;
    this.lastFetchTime = new Date().getTime();
  }

  setUnits(units) {
    // Implement logic to change units (metric/imperial)
    // This might involve re-formatting the cached data or fetching new data
  }

  // Add more methods as needed, for example:
  // getHourlyForecast(), getDailyForecast(), etc.
}

export const weatherService = new WeatherService();