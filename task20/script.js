// Select HTML elements
const form = document.querySelector('#location-form');
const locationInput = document.querySelector('#location-input');
const formMessage = document.querySelector('#form-message');
const weatherContent = document.querySelector('#weather-content');
const refreshButton = document.querySelector('#refresh-button');
const hourlyList = document.querySelector('#hourly-list');
const rangeButtons = document.querySelectorAll('.range-button');

const LOCATION_PATTERN = /^[A-Za-z0-9]+(?:[', ]+[A-Za-z0-9]+)*$/;

let selectedLocation = '';
let weatherData = null;
let activeRange = 'previous';

// Get date
const getDateString = (date) => {
  return date.toISOString().slice(0, 10);
};

// Get date range
const getRequestRange = () => {
  const start = new Date();
  const end = new Date();

  start.setDate(start.getDate() - 2);
  end.setDate(end.getDate() + 2);

  return {
    start: getDateString(start),
    end: getDateString(end)
  };
};

const validateLocation = (rawValue) => {
  if (rawValue === '') {
    return { valid: false, message: 'Please enter a location.' };
  }

  if (rawValue !== rawValue.trim()) {
    return {
      valid: false,
      message: 'Remove spaces at the beginning or end of the location.'
    };
  }

  const location = rawValue.trim();

  if (!LOCATION_PATTERN.test(location)) {
    return {
      valid: false,
      message:
        'Location can only contain letters, numbers, spaces, and commas (no other special characters).'
    };
  }

  return { valid: true, location };
};

// Fetch weather using Axios
const fetchForecast = async (location) => {
  const dates = getRequestRange();

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/${dates.start}/${dates.end}`;

  const response = await axios.get(url, {
    params: {
      unitGroup: 'metric',
      include: 'days,hours,current',
      key: WEATHER_API_KEY,
      contentType: 'json'
    }
  });

  return response.data;
};

// Get weather icon
const formatWeatherIcon = (icon) => {
  if (!icon) return '☁';
  if (icon.includes('rain')) return '🌧';
  if (icon.includes('snow')) return '❄';
  if (icon.includes('thunder')) return '⛈';
  if (icon.includes('clear') || icon.includes('sun')) return '☀';
  if (icon.includes('cloud')) return '☁';

  return '☁';
};

// Display message
const setMessage = (message, isError = false) => {
  formMessage.textContent = message;

  if (isError) {
    formMessage.classList.add('error');
  } else {
    formMessage.classList.remove('error');
  }
};

const setWeatherBusy = (isBusy) => {
  weatherContent.setAttribute('aria-busy', isBusy ? 'true' : 'false');
};

// Display current weather
const renderCurrentWeather = (data) => {
  const current = data.currentConditions;
  const today = data.days[0];

  document.querySelector('#place-name').textContent = data.resolvedAddress;
  document.querySelector('#current-date').textContent = today.datetime;
  document.querySelector('#condition-label').textContent = current.conditions;
  document.querySelector('#condition-icon').textContent = formatWeatherIcon(current.icon);
  document.querySelector('#temperature').textContent = Math.round(current.temp) + '°';
  document.querySelector('#feels-like').textContent = 'Local time: ' + current.datetime;
  document.querySelector('#wind-speed').textContent = Math.round(current.windspeed) + ' km/h';
  document.querySelector('#rain-chance').textContent = Math.round(today.precipprob || 0) + '%';
  document.querySelector('#day-range').textContent =
    Math.round(today.tempmin) + '° / ' + Math.round(today.tempmax) + '°';
};

// Display hourly weather
const renderHourly = () => {
  if (weatherData === null) return;

  let hours = [];

  for (let i = 0; i < weatherData.days.length; i++) {
    const day = weatherData.days[i];

    for (let j = 0; j < day.hours.length; j++) {
      hours.push(day.hours[j]);
    }
  }

  if (activeRange === 'previous') {
    hours = hours.slice(0, 24);
  } else {
    hours = hours.slice(24, 48);
  }

  let html = '';

  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];

    html += `
      <article class="hour-card" role="listitem">
        <div class="hour-time">${hour.datetime}</div>
        <div class="hour-icon">${formatWeatherIcon(hour.icon)}</div>
        <div class="hour-temp">${Math.round(hour.temp)}°</div>
        <div class="hour-rain">${Math.round(hour.precipprob || 0)}% rain</div>
        <div class="hour-wind">${Math.round(hour.windspeed)} km/h</div>
      </article>
    `;
  }

  hourlyList.innerHTML = html;
};

// Load weather
const loadWeather = async (location) => {
  setMessage('Loading weather...');
  refreshButton.disabled = true;

  if (weatherContent.hidden === false) {
    setWeatherBusy(true);
  }

  try {
    const data = await fetchForecast(location);

    weatherData = data;
    selectedLocation = location;

    renderCurrentWeather(data);
    renderHourly();

    weatherContent.hidden = false;
    setMessage('Weather updated successfully.');
  } catch (error) {
    setMessage('Unable to get weather. Check the location or API key.', true);
  }

  setWeatherBusy(false);
  refreshButton.disabled = false;
};

// Handle form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const result = validateLocation(locationInput.value);

  if (!result.valid) {
    setMessage(result.message, true);
    return;
  }

  await loadWeather(result.location);
});

// Refresh weather
refreshButton.addEventListener('click', () => {
  if (selectedLocation !== '') {
    loadWeather(selectedLocation);
  }
});

// Handle range buttons
rangeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeRange = button.dataset.range;

    rangeButtons.forEach((item) => {
      item.classList.remove('active');
    });

    button.classList.add('active');

    renderHourly();
  });
});
