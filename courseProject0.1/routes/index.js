import { Router } from "express";
import userRoutes from './user.routes.js'
import weatherRoutes from './weather_api.routes.js'
import authRoutes from './auth.routes.js'
const router = Router();

router.use('/users',userRoutes);
router.use('/weather',weatherRoutes);
router.use('/auth',authRoutes)


export default router