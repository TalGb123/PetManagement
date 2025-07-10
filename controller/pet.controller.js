import { PetService } from "../services/pet.service.js"

export const getAllAnimals = async(req,res) => {
    try {
        // Remove the undefined 'type' parameter
        const data = await PetService.getAllAnimals()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllBreeds = async (req, res) => {
    try {
        const type = req.params.type
        const data = await PetService.getAllBreedsOfAnimal(type)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getSingleAnimalType = async (req, res) => {
    try {
        const type = req.params.type
        const data = await PetService.getSingleAnimalType(type)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAnimalById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await PetService.getAnimalById(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}