import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = "adc2c608775248879cd174146240409"; 
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${data.location.name}&days=5`;

      try {
        const response = await axios.get(url);
        setForecastData(response.data.forecast.forecastday);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [data.location.name]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.location.name}, <span>{data.location.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {data.current.condition.icon && (
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.current.temp_c)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.current.condition.text}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40"/>
          <div>
            <p className="wind">{data.current.wind_kph} km/h</p>
          </div>
          <p>Wind speed</p>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40"/>
          <div>
            <p className="humidity">{data.current.humidity}%</p>
        </div>
        <p>Humidity</p>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData &&
            forecastData.map((day) => (
              <div className="day" key={day.date}>
                <p className="day-name">{formatDay(day.date)}</p>
                {day.day.condition.icon && (
                  <img
                    className="day-icon"
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.day.mintemp_c)}°/ <span>{Math.round(day.day.maxtemp_c)}°</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}        

export default Forecast;
