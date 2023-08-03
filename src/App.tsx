import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";

import { useState } from "react";


interface SearchData {
  label: string;
  value: string;
}

function App() {
  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData: SearchData) => {
    const [lon, lat] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=09d5ddc1d9c7a7e3d3a9845220c0f1d2&units=metric`
    );
    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=09d5ddc1d9c7a7e3d3a9845220c0f1d2&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: searchData.label ? searchData.label: weatherResponse.name, ...weatherResponse });

        const weatherForecastResponse = await response[1].json();
        setForecast({ city: searchData.label ? searchData.label: weatherResponse.name, ...weatherForecastResponse });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-container">
    
    <div className="container" >
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather currentWeather={currentWeather} />}
      {forecast && <Forecast forecast={forecast} />}
    </div>
    </div>
  );
}

export default App;
