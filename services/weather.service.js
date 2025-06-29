import { api_key } from '../config/index.js'
const apiUrl = "https://api.openweathermap.org/data/2.5"

export const weatherService = {

    getWeatherByCity: async (city) => {
        try {
            console.log(`Fetching real time weather data fot city:${city}`);
            const res = await fetch(`${apiUrl}/weather?q=${city}&appid=${api_key}&units=metric`)
            const data = await res.json();


            console.log("City data", data);
            const temp= data.main.temp
            const formtedData = {
                tempC: temp,
                tempF: temp * 9/5 +35,
                feels_like:data.main.feels_like,
                windSpeed: data.wind.speed* 3.6+" KMH",
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                timezone: data.timezone,
                country: data.sys.country

            }

            return {
                message: "good",
                data: formtedData

            }
        } catch (error) {

        }

    },
    getForcastByDays: (city, numOfDays) => {
        try {

        } catch (error) {

        }

    }
}