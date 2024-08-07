export function formatWeatherData(data) {
  return {
    location: formatLocationInfo(data),
    current: formatCurrentWeather(data),
    today: formatTodayWeather(data),
    hourly: formatHourlyWeather(data),
    daily: formatDailyWeather(data)
  };
}

function formatLocationInfo(data) {
  return {
    address: data.resolvedAddress,
    timezone: data.timezone,
    tzoffset: data.tzoffset,
    description: data.description
  };
}

function formatCurrentWeather(data) {
  const current = data.currentConditions;
  return {
    temp: current.temp,
    feelslike: current.feelslike,
    humidity: current.humidity,
    windspeed: current.windspeed,
    precipprob: current.precipprob,
    uvindex: current.uvindex,
    visibility: current.visibility,
    conditions: current.conditions,
    icon: current.icon
  };
}

function formatTodayWeather(data) {
  const today = data.days[0];
  return {
    sunrise: today.sunrise,
    sunset: today.sunset,
    precipitation: today.precip,
    uvIndex: today.uvindex,
    moonPhase: today.moonphase,
    cloudCover: today.cloudcover,
    highTemp: today.tempmax,
    lowTemp: today.tempmin
  };
}

function formatHourlyWeather(data) {
  return data.days.map(day => ({
    date: day.datetime,
    hours: day.hours.map(hour => ({
      time: hour.datetime,
      temp: (hour.temp),
      feelslike: hour.feelslike,
      humidity: hour.humidity,
      windspeed: hour.windspeed,
      precipprob: hour.precipprob,
      uvindex: hour.uvindex,
      visibility: hour.visibility,
      conditions: hour.conditions,
      icon: hour.icon
    }))
  }));
}

function formatDailyWeather(data) {
  const days = data.days
  return days.map(day => ({
    date: day.datetime,
    sunrise: day.sunrise,
    sunset: day.sunset,
    highTemp: day.tempmax,
    lowTemp: day.tempmin,
    feelsLikeMax: day.feelslikemax,
    feelsLikeMin: day.feelslikemin,
    temp: day.temp,
    uvIndex: day.uvindex,
    cloudCover: day.cloudcover,
    precipprob: day.precipprob,
    icon: day.icon
  }));
}