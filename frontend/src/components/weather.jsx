import React, { useState } from "react";
import { motion } from "framer-motion";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiCloudyWindy } from "react-icons/wi";
import { CiLocationOn } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Gauge } from "lucide-react";
import Clouds from "../assets/clouds.mp4";
import Card from "./card";
import axios from "axios";
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [Name, setName] = useState(null);
  const GEO_CODE = "https://api.openweathermap.org/geo/1.0/direct?";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?";
  const KEY =import.meta.env.VITE_API_KEY;
  
  const coordinates = async (q) => {
    try {
      const url = `${GEO_CODE}q=${q}&appid=${KEY}`;
      const response = await axios.get(url);
      const name = response.data[0].name;
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      const res = { lat, lon, name };
      return res;
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { lat, lon,name} = await coordinates(city);
      setName(name);
      const response = await axios.get(`${BASE_URL}lat=${lat}&lon=${lon}&appid=${KEY}`);
      setWeather(response.data);
      setShowForecast(false);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
    setLoading(false);
  };
  const fetchForecast = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { lat, lon,name} = await coordinates(city);
      const response = await axios.get(`${FORECAST_URL}lat=${lat}&lon=${lon}&cnt=${1}&appid=${KEY}`);
      setForecast(response.data);
      setShowForecast(true);
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
    setLoading(false);
  };

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(2);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        src={Clouds}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>

      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6"
        >
          Weather Detector
        </motion.h1>

        <div className="flex gap-4 mb-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 w-full text-lg rounded-xl border border-gray-300 text-black"
          />
          <button
            onClick={fetchWeather}
            className="p-3 text-lg bg-white text-blue-600 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {loading && (
          <div className="mb-6 flex items-center gap-3 text-white text-lg">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            Fetching weather details...
          </div>
        )}

        {weather && !showForecast && (
          <>
            <button
              onClick={fetchForecast}
              className="mb-4 px-6 py-2 bg-white/50 text-white rounded-xl shadow hover:bg-yellow-400 transition-all"
            >
              See Tomorrow's Forecast
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
            >
              <Card
                title="Location"
                content={`${Name}, ${weather.sys.country}`}
                icon={<CiLocationOn />}
              />
              <Card
                title="Status"
                content={weather.weather[0].description}
                icon={<TiWeatherPartlySunny />}
              />
              <Card
                title="Coordinates"
                content={`Lat: ${weather.coord.lat}, Lon: ${weather.coord.lon}`}
                icon={<FaLocationCrosshairs />}
              />
              <Card
                title="Temperature"
                content={`${kelvinToCelsius(weather.main.temp)}°C`}
                icon={<FaTemperatureHigh />}
              />
              <Card
                title="Feels Like"
                content={`${kelvinToCelsius(weather.main.feels_like)}°C`}
                icon={<FaTemperatureHigh />}
              />
              <Card
                title="Humidity"
                content={`${weather.main.humidity}%`}
                icon={<WiCloudyWindy />}
              />
              <Card
                title="Wind Speed"
                content={`${(weather.wind.speed * 3.6).toFixed(2)} km/h`}
                icon={<WiCloudyWindy />}
              />
              <Card
                title="Pressure"
                content={`${weather.main.pressure} hPa`}
                icon={<Gauge />}
              />
            </motion.div>
          </>
        )}

        {forecast && showForecast && (
          <>
            <button
              onClick={() => setShowForecast(false)}
              className="mb-4 px-6 py-2 bg-white/50 text-white rounded-xl shadow hover:bg-green-400 transition-all"
            >
              Back to Today's Weather
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
            >
              <Card
                title="Location"
                content={`${Name}`}
                icon={<CiLocationOn />}
              />
              <Card
                title="Weather"
                content={forecast.list[0].weather[0].description}
                icon={<TiWeatherPartlySunny />}
              />
              <Card
                title="Min Temp"
                content={`${kelvinToCelsius(
                  forecast.list[0].main.temp_min
                )}°C`}
                icon={<FaTemperatureHigh />}
              />
              <Card
                title="Max Temp"
                content={`${kelvinToCelsius(
                  forecast.list[0].main.temp_max
                )}°C`}
                icon={<FaTemperatureHigh />}
              />
              <Card
                title="Feels Like"
                content={`${kelvinToCelsius(
                  forecast.list[0].main.feels_like
                )}°C`}
                icon={<FaTemperatureHigh />}
              />
              <Card
                title="Humidity"
                content={`${forecast.list[0].main.humidity}%`}
                icon={<WiCloudyWindy />}
              />
              <Card
                title="Pressure"
                content={`${forecast.list[0].main.pressure} hPa`}
                icon={<Gauge />}
              />
              <Card
                title="Wind Speed"
                content={`${(forecast.list[0].wind.speed * 3.6).toFixed(
                  2
                )} km/h`}
                icon={<WiCloudyWindy />}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
