const query = async url => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
};

export const fetchWeather = async ({ lat, lon }) =>
  query(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process
      .env.REACT_APP_API_KEY_WEATHER}`
  );
