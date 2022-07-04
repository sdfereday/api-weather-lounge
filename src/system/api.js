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
    `/.netlify/functions/location?lat=${lat}&lon=${lon}&apikey=def425e10a3919d888ddcdff2b1eafd3`
  );
