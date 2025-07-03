import { Router } from "express";
import userRoutes from './user.routes.js'
import petRoutes from './pet_api.routes.js'
import authRoutes from './auth.routes.js'
const router = Router();

router.use('/users',userRoutes);
router.use('/pets',petRoutes);
router.use('/auth',authRoutes)


export default router