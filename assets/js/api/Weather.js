// OpenWeather API -> API de terceros para función de clima
const API_KEY = "c2a3c64a00c82e43fea14af54b21db97";
const getWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error("La petición a la API no funcionó".response.statusText);

    const data = await response.json();
    console.log("Datos del clima obtenidos", data);
    const nombreLocalidad = data.name.split(", ");
    console.log(nombreLocalidad);

    // Barra que irá sobre el navbar
    const topBar = document.getElementById("topBar");
    topBar.innerHTML = `
            <div class="container-fluid">
                <p class="small my-0 mx-auto">Clima en ${nombreLocalidad[0]}<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" width= "40">${data.weather[0].description}  |  Temperatura actual: ${data.main.temp}°C  |  Humedad ambiental: ${data.main.humidity}%</p>
            </div>
        `;
  } catch (error) {
    console.error(error);
  }
};
export default getWeather;
