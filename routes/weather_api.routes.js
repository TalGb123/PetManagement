
import { Router } from "express";
import {getWeatherByCity,getForcastByDays} from '../controller/weather.controller.js'

const router = Router();


router.get('/current/:city',getWeatherByCity)
router.get('/forecast/:city',getForcastByDays)

export default router