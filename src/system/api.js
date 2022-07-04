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
    `https://open-weather-proxy.herokuapp.com/weather?lat=${lat}&lon=${lon}`
  );
