export function updateWeatherDisplay(weatherData) {
  updateLocationInfo(weatherData.location);
  updateCurrentWeather(weatherData.current);
  updateTodayWeather(weatherData.today);
  updateHourlyWeather(weatherData.hourly);
  updateDailyWeather(weatherData.daily);
}

function updateLocationInfo(locationInfo) {
  document.getElementById('address').textContent = locationInfo.address;
  document.getElementById('timezone').textContent = `${locationInfo.timezone} GMT(${locationInfo.tzoffset >= 0 ? '+' + locationInfo.tzoffset : '-' + locationInfo.tzoffset})`;
  document.getElementById('description').textContent = locationInfo.description;
}

function updateCurrentWeather(currentWeather) {
  const currentWeatherDiv = document.querySelector('.current-weather');
  
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  currentWeatherDiv.innerHTML = `
    <h2>Current weather</h2>
    <div class="weather-card">
      <div class="weather-main">
        <div class="weather-temp">${currentWeather.temp}°C</div>
        <div class="weather-icon-large">
          <i class="wi ${getWeatherIconClass(currentWeather.icon)}"></i>
        </div>
        <div class="weather-info">
          <div class="weather-condition">${currentWeather.conditions}</div>
          <div class="weather-time">${currentTime}</div>
        </div>
      </div>
      <div class="weather-details">
        <div class="weather-item">
          <i class="wi wi-thermometer"></i>
          <span class="weather-value">${currentWeather.feelslike}°C</span>
          <span class="weather-label">Feels like</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-humidity"></i>
          <span class="weather-value">${currentWeather.humidity}%</span>
          <span class="weather-label">Humidity</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-strong-wind"></i>
          <span class="weather-value">${currentWeather.windspeed} km/h</span>
          <span class="weather-label">Wind Speed</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-raindrops"></i>
          <span class="weather-value">${currentWeather.precipprob}%</span>
          <span class="weather-label">Chance of Rain</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-day-sunny"></i>
          <span class="weather-value">${currentWeather.uvindex}</span>
          <span class="weather-label">UV Index</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-fog"></i>
          <span class="weather-value">${currentWeather.visibility} km</span>
          <span class="weather-label">Visibility</span>
        </div>
      </div>
    </div>
  `;
}

function updateTodayWeather(todayWeather) {
  const todayWeatherDiv = document.querySelector('.today-weather');
  
  todayWeatherDiv.innerHTML = `
    <h2>Today's Overview</h2>
    <div class="weather-card">
      <div class="today-main">
        <div class="sun-info">
          <div class="sun-item">
            <i class="wi wi-sunrise"></i>
            <span>Sunrise</span>
            <span class="sun-time">${todayWeather.sunrise}</span>
          </div>
          <div class="sun-item">
            <i class="wi wi-sunset"></i>
            <span>Sunset</span>
            <span class="sun-time">${todayWeather.sunset}</span>
          </div>
        </div>
      </div>
      <div class="today-details">
        <div class="weather-item">
          <i class="wi wi-raindrops"></i>
          <span class="weather-value">${todayWeather.precipitation ? todayWeather.precipitation : '0'} mm</span>
          <span class="weather-label">Precipitation</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-day-sunny"></i>
          <span class="weather-value">${todayWeather.uvIndex}</span>
          <span class="weather-label">UV Index</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-moon-new"></i>
          <span class="weather-value">${getMoonPhaseDescription(todayWeather.moonPhase)}</span>
          <span class="weather-label">Moon Phase</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-cloudy"></i>
          <span class="weather-value">${todayWeather.cloudCover}%</span>
          <span class="weather-label">Cloud Cover</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-thermometer"></i>
          <span class="weather-value">${todayWeather.highTemp}°C</span>
          <span class="weather-label">Highest</span>
        </div>
        <div class="weather-item">
          <i class="wi wi-thermometer-exterior"></i>
          <span class="weather-value">${todayWeather.lowTemp}°C</span>
          <span class="weather-label">Lowest</span>
        </div>
      </div>
    </div>
  `;
}

function updateHourlyWeather(hourlyData) {
  const hourlyWeatherDiv = document.querySelector('.hourly-weather');
  let currentDayIndex = 0;

  function updateDayDisplay() {
    const dayData = hourlyData[currentDayIndex];
    
    hourlyWeatherDiv.innerHTML = `
      <div class="day-navigation">
        <button id="prevDay" ${currentDayIndex === 0 ? 'disabled' : ''}>&lt; Previous Day</button>
        <h2>Hourly weather for ${dayData.date}</h2>
        <button id="nextDay" ${currentDayIndex === hourlyData.length - 1 ? 'disabled' : ''}>Next Day &gt;</button>
      </div>
      <div class="weather-card">
        <div class="hourly-scroll-container">
          ${dayData.hours.map(hour => `
            <div class="hourly-item">
              <div class="weather-main">
                <div class="weather-temp">${hour.temp}°C</div>
                <div class="weather-icon-large">
                  <i class="wi ${getWeatherIconClass(hour.icon)}"></i>
                </div>
                <div class="weather-info">
                  <div class="weather-time">${hour.time}</div>
                  <div class="weather-condition">${hour.conditions}</div>
                </div>
              </div>
              <div class="weather-details">
                <div class="weather-item">
                  <i class="wi wi-thermometer"></i>
                  <span class="weather-value">${hour.feelslike}°C</span>
                  <span class="weather-label">Feels like</span>
                </div>
                <div class="weather-item">
                  <i class="wi wi-humidity"></i>
                  <span class="weather-value">${hour.humidity}%</span>
                  <span class="weather-label">Humidity</span>
                </div>
                <div class="weather-item">
                  <i class="wi wi-strong-wind"></i>
                  <span class="weather-value">${hour.windspeed} km/h</span>
                  <span class="weather-label">Wind Speed</span>
                </div>
                <div class="weather-item">
                  <i class="wi wi-raindrops"></i>
                  <span class="weather-value">${hour.precipprob}%</span>
                  <span class="weather-label">Chance of Rain</span>
                </div>
                <div class="weather-item">
                  <i class="wi wi-day-sunny"></i>
                  <span class="weather-value">${hour.uvindex}</span>
                  <span class="weather-label">UV Index</span>
                </div>
                <div class="weather-item">
                  <i class="wi wi-fog"></i>
                  <span class="weather-value">${hour.visibility} km</span>
                  <span class="weather-label">Visibility</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Add event listeners for navigation buttons
    document.getElementById('prevDay').addEventListener('click', () => {
      if (currentDayIndex > 0) {
        currentDayIndex--;
        updateDayDisplay();
      }
    });

    document.getElementById('nextDay').addEventListener('click', () => {
      if (currentDayIndex < hourlyData.length - 1) {
        currentDayIndex++;
        updateDayDisplay();
      }
    });
  }

  // Initial display
  updateDayDisplay();
}

function updateDailyWeather(dailyData) {
  const dailyWeatherDiv = document.querySelector('.daily-weather');
  
  dailyWeatherDiv.innerHTML = `
    <h2>Daily Forecast</h2>
    <div class="weather-card">
      <div class="daily-scroll-container">
        ${dailyData.map(day => `
          <div class="daily-item">
            <div class="weather-date">${formatDate(day.date)}</div>
            <div class="weather-icon-large">
              <i class="wi ${getWeatherIconClass(day.icon)}"></i>
            </div>
            <div class="weather-item">
              <span class="weather-value">${day.temp}°C</span>
              <span class="weather-label">Avg Temp</span>
            </div>
            
            <div class="daily-details">
              <div class="weather-item">
                <i class="wi wi-sunrise"></i>
                <span class="weather-value">${day.sunrise}</span>
                <span class="weather-label">Sunrise</span>
              </div>
              <div class="weather-item">
                <i class="wi wi-sunset"></i>
                <span class="weather-value">${day.sunset}</span>
                <span class="weather-label">Sunset</span>
              </div>
              <div class="weather-item">
                <i class="wi wi-thermometer"></i>
                <span class="weather-value">${day.highTemp}°C</span>
                <span class="weather-label">Highest</span>
              </div>
              <div class="weather-item">
                <i class="wi wi-thermometer-exterior"></i>
                <span class="weather-value">${day.lowTemp}°C</span>
                <span class="weather-label">Lowest</span>
              </div>
              <div class="weather-item">
                
                <span class="weather-value">${day.feelsLikeMin}°C - ${day.feelsLikeMax}°C</span>
                <span class="weather-label">Feels Like</span>
              </div>
              <div class="weather-item">
                <i class="wi wi-day-sunny"></i>
                <span class="weather-value">${day.uvIndex}</span>
                <span class="weather-label">UV Index</span>
              </div>
              <div class="weather-item">
                <i class="wi wi-cloudy"></i>
                <span class="weather-value">${day.cloudCover}%</span>
                <span class="weather-label">Cloud Cover</span>
              </div>
              <div class="weather-item">
                <i class="wi wi-raindrops"></i>
                <span class="weather-value">${day.precipprob}%</span>
                <span class="weather-label">Chance of Rain</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function getWeatherIconClass(iconCode) {
  const iconMap = {
    'clear-day': 'wi-day-sunny',
    'clear-night': 'wi-night-clear',
    'rain': 'wi-rain',
    'snow': 'wi-snow',
    'sleet': 'wi-sleet',
    'wind': 'wi-windy',
    'fog': 'wi-fog',
    'cloudy': 'wi-cloudy',
    'partly-cloudy-day': 'wi-day-cloudy',
    'partly-cloudy-night': 'wi-night-alt-cloudy',
  };
  return iconMap[iconCode] || 'wi-na'; 
}

function getMoonPhaseDescription(moonphase) {
  if (moonphase === 0) return "New Moon";
  if (moonphase < 0.25) return "Waxing Crescent";
  if (moonphase === 0.25) return "First Quarter";
  if (moonphase < 0.5) return "Waxing Gibbous";
  if (moonphase === 0.5) return "Full Moon";
  if (moonphase < 0.75) return "Waning Gibbous";
  if (moonphase === 0.75) return "Last Quarter";
  return "Waning Crescent";
}