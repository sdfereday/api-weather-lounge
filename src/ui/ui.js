import React, { useState, useEffect } from "react";
import { weatherToHex, AllWeathers, RAIN } from "../system/consts";

export default ({
  children,
  weatherData,
  onManualWeatherChange = () => { }
}) => {
  const [currentWeatherSelect, setCurrentWeatherSelect] = useState("default");
  const [weatherHex, setWeatherHex] = useState(weatherToHex[RAIN]);

  const manualWeatherChange = e => {
    setCurrentWeatherSelect(e.target.value);
    onManualWeatherChange(e.target.value);
    setWeatherHex(weatherToHex[e.target.value]);
  }

  useEffect(() => {
    setWeatherHex(weatherToHex[weatherData ? weatherData.main : weatherToHex[RAIN]]);
  }, [weatherData]);

  return (
    <div className={`ui-wrapper transition-all ease-in-out`} style={{ backgroundColor: weatherHex }}>
      <div className="ui-gradient bg-gradient-to-t from-slate-800">
        <div className="ui-root w-[680px]">
          {children}
          {weatherData ?
            <div className="text-center">
              <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} className="inline-block" />
              <p>Current weather in {weatherData.location} appears to be {weatherData.description}.</p></div>
            : <p>Getting the weather...</p>}
          <p>Change the weather to:</p>
          <select className="text-black mb-6" onChange={manualWeatherChange} value={currentWeatherSelect}>
            <option value={"default"} disabled>
              Choose an option
            </option>
            {AllWeathers.map((w, i) =>
              <option className="text-black" key={`weather-option-${i}`}>
                {w}
              </option>)}
          </select>
        </div>
      </div>
    </div>
  );
};
