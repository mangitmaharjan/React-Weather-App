import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./current-weather.css";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

interface Sys {
  country: string;
}

interface Wind {
  speed: number;
  deg: number;
}

interface CurrentWeatherData {
  city: string;
  weather: Weather[];
  main: Main;
  sys: Sys;
  wind: Wind;
}

interface Props {
  currentWeather: CurrentWeatherData;
}

const CurrentWeather = ({ currentWeather }: Props) => {
  console.log('Component: CurrentWeather');
  return (
    <div className="weather">
      <div className="top">
        <div>
          <div className="flag">
            <img src={`https://flagsapi.com/${currentWeather.sys.country}/shiny/64.png`} alt="" />
          </div>
          <div className="city-detail">
            <p className="city">{currentWeather.city}</p>
            <p className="weather-description">
              {currentWeather.weather[0].description}
            </p>
          </div>
        </div>
        <img
          alt="Weather"
          src={`icons/${currentWeather.weather[0].icon}.png`}
          className="weather-icon"
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(currentWeather.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">
              {Math.round(currentWeather.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">
              {currentWeather.wind.speed} m/s {currentWeather.wind.deg}°
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">
              {currentWeather.main.humidity}%
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">
              {currentWeather.main.pressure}
            </span>
          </div>
        </div>
      </div>
      <div className="sunrise-sunset">
        <div className="row">
          <div className="col-6 sunrise">
            <div className="icon">
            <FontAwesomeIcon icon={faSun} />
            </div>
          </div>
          <div className="col-6 sunset">
            <div className="icon">
            <FontAwesomeIcon icon={faMoon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
