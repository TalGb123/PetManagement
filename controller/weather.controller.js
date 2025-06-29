
import { weatherService } from "../services/weather.service.js"


export const getWeatherByCity =  async(req,res) => {
 try {
    const city = req.params.city
    const data = await  weatherService.getWeatherByCity(city)
    res.status(200).json(data)

} catch (error) {
    res.status(500).json({ message: error.message })
}

}
export const getForcastByDays = async (req,res) => {
    try {
        const city = req.params.city
        const numOfDays = req.query. numOfDays || 4
        const data = await  weatherService.getForcastByDays(city,numOfDays)
        res.status(200).json(data)
    
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}