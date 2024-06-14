const searchBox = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const errorDiv = document.querySelector('.not-found');
const cityName = document.querySelector('.city-hide');

const apiKey = '059dcee9c15c93a942eb1f38b72876be'; 

searchBtn.addEventListener('click', () => {
  const city = searchBox.value.trim();

  if (city === '') {
    return;
  }

  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        cityName.textContent = city;
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        errorDiv.style.display = 'block';
        return;
      }

      updateWeatherUI(data);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

function updateWeatherUI(data) {
  const { name, weather, main } = data;
  const { description, icon } = weather[0];
  const { temp, humidity } = main;
  const { speed } = data.wind;

  cityName.textContent = name;
  weatherBox.style.display = 'block';
  weatherDetails.style.display = 'flex'; 
  errorDiv.style.display = 'none';
  
  const weatherIcon = document.querySelector('.weather-box img');
  let iconUrl;
  switch(icon) {
    case '01d':
      iconUrl = "https://i.postimg.cc/RZHmKgCr/clear.png"; 
      break;
    case '02d':
    case '02n':
      iconUrl = "https://i.postimg.cc/jjYbXyCD/clouds.png"; 
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      iconUrl = "https://i.postimg.cc/jjYbXyCD/clouds.png"; 
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      iconUrl = "https://i.postimg.cc/Y9pwck6k/rain.png"; 
      break;
    case '50d':
    case '50n':
      iconUrl = "https://i.postimg.cc/xdGSFqbt/mist.png"; 
      break;
    case '13d':
    case '13n':
      iconUrl = "https://i.postimg.cc/fLBQDFCd/snow.png"; 
      break;
    default:
      iconUrl = 'https://i.postimg.cc/RZHmKgCr/clear.png'; 
  }


  weatherIcon.src = iconUrl;
  
  const temperatureElement = document.querySelector('.weather-box .temprature');
  const descriptionElement = document.querySelector('.weather-box .description');
  const humidityElement = document.querySelector('.weather-details .humidity span');
  const windElement = document.querySelector('.weather-details .wind span');

  
  temperatureElement.textContent = `${Math.round(temp)}°C`;
  descriptionElement.textContent = description;
  humidityElement.textContent = `${humidity}%`;
  windElement.textContent = `${speed}Km/h`;
}

