import { weatherService } from './weatherService.js';
import { updateWeatherDisplay } from './domManager.js';

export function setupEventListeners() {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearch);

  const unitToggle = document.getElementById('unit-toggle');
  unitToggle.addEventListener('change', handleUnitToggle);

  const refreshButton = document.getElementById('refresh-button');
  refreshButton.addEventListener('click', handleRefresh);
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
  if (isUS) {
    switchToUSUnits();
  } else {
    switchToMetricUnits();
  }
}

function handleRefresh() {
  const searchInput = document.getElementById('search-input');
  handleSearch({ preventDefault: () => {}, target: searchInput });
}

function switchToUSUnits() {
  const elements = document.body.getElementsByTagName('*');
  
  for (let element of elements) {
    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
      let text = element.textContent;
      
      // Thay thế °C bằng °F
      if (text.includes('°C')) {
        element.textContent = text.replace(/(-?\d+(\.\d+)?)°C/g, (match, celsius) => {
          const fahrenheit = Math.round((parseFloat(celsius) * 9/5 + 32) * 10) / 10;
          return `${fahrenheit}°F`;
        });
      }
      
      // Thay thế km/h bằng mph
      if (text.includes('km/h')) {
        element.textContent = text.replace(/(\d+(\.\d+)?)\s*km\/h/g, (match, kmh) => {
          const mph = Math.round(parseFloat(kmh) / 1.60934 * 10) / 10;
          return `${mph} mph`;
        });
      }
    }
  }
}

function switchToMetricUnits() {
  const elements = document.body.getElementsByTagName('*');
  
  for (let element of elements) {
    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
      let text = element.textContent;
      
      // Thay thế °F bằng °C
      if (text.includes('°F')) {
        element.textContent = text.replace(/(-?\d+(\.\d+)?)°F/g, (match, fahrenheit) => {
          const celsius = Math.round(((parseFloat(fahrenheit) - 32) * 5/9) * 10) / 10;
          return `${celsius}°C`;
        });
      }
      
      // Thay thế mph bằng km/h
      if (text.includes('mph')) {
        element.textContent = text.replace(/(\d+(\.\d+)?)\s*mph/g, (match, mph) => {
          const kmh = Math.round(parseFloat(mph) * 1.60934 * 10) / 10;
          return `${kmh} km/h`;
        });
      }
    }
  }
}