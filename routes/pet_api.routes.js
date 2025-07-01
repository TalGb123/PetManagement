
import { Router } from "express";
import {getAllAnimals,getAllBreeds,getSingleAnimalType} from '../controller/pet.controller.js'

const router = Router();

router.get('/allanimals/',getAllAnimals);
router.get('/getallbreeds/:type',getAllBreeds);
router.get('/getsingleanimal/:type',getSingleAnimalType);


export default router