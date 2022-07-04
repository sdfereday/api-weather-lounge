import "./style.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UI from "./ui/ui";
import Game from "./game/game";
import { fetchWeather } from "./system/api";
import { defaultLocation } from "./system/consts";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [gameWeatherMode, setGameWeatherMode] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);

  const handleManualWeatherChange = v => setGameWeatherMode(v);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCurrentLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      });
    }
  }, []);

  useEffect(
    () => {
      fetchWeather(currentLocation)
        .then(res => {
          const { name, weather } = res;
          setWeatherData({
            location: name,
            ...weather[0]
          });
          setGameWeatherMode(weather[0].main);
        })
        .catch(e => console.log(e.message));
    },
    [currentLocation]
  );

  return (
    <UI
      weatherData={weatherData}
      onManualWeatherChange={handleManualWeatherChange}
    >
      <Game gameWeatherMode={gameWeatherMode} />
    </UI>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
