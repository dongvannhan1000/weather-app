import { weatherService } from './weatherService.js';
import { updateWeatherDisplay } from './domManager.js';

export function setupEventListeners() {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearch);

  const unitToggle = document.getElementById('unit-toggle');
  unitToggle.addEventListener('change', handleUnitToggle);

  const refreshButton = document.getElementById('refresh-button');
  refreshButton.addEventListener('click', handleRefresh);

  loadDefaultWeather();
}

async function loadDefaultWeather() {
  try {
    const defaultLocation = 'Ho Chi Minh'; // Default to Ho Chi Minh City
    const weatherData = await weatherService.getWeatherData(defaultLocation);
    updateWeatherDisplay(weatherData);
  } catch (error) {
    console.error('Error fetching default weather data:', error);
  }
}

async function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const location = searchInput.value;

  try {
    const weatherData = await weatherService.getWeatherData(location);
    updateWeatherDisplay(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Implement error handling and user notification
  }
}

function handleUnitToggle(event) {
  const isUS = event.target.checked;
  const units = isUS ? 'us' : 'metric';
  weatherService.setUnits(units);
  // Refresh the display with new units
  handleRefresh();
}

function handleRefresh() {
  const searchInput = document.getElementById('search-input');
  handleSearch({ preventDefault: () => {}, target: searchInput });
}

