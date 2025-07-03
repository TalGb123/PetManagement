import { getPetfinderToken } from '../utils/token.js'
const apiUrl = "https://api.petfinder.com/v2/"

const formatBreeds = (breeds) => {
    if (breeds.unknown) return "Unknown Breed";
    if (!breeds.mixed) return breeds.primary;
    if (breeds.secondary) return `${breeds.primary} / ${breeds.secondary}`;
    return "Mixed Breed";
};

const formatColors = (colors) => {
    const { primary, secondary, tertiary } = colors;
    const colorParts = [primary, secondary, tertiary].filter(color => color !== null);
    return colorParts.length > 0 ? colorParts.join(" / ") : "Unknown Color";
};

export const PetService = {

    getAllAnimals : async () => {
        try {
            const token = await getPetfinderToken();
            console.log(`Fetching all animals:`);
            const res = await fetch(`${apiUrl}animals`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            console.log("API response:", data);
            
            if (!data.animals || !Array.isArray(data.animals) || data.animals.length === 0) {
                return {
                    message: "good",
                    data: []
                };
            }

            const formattedAnimals = data.animals.map(animal => ({
                id: animal.id,
                type: animal.type,
                name: animal.name,
                breed: formatBreeds(animal.breeds),
                color: formatColors(animal.colors),
                gender: animal.gender,
                age: animal.age,
                size: animal.size,
            }));

            return {
                message: "good",
                data: formattedAnimals, 
            }
        } catch (error) {
            console.error("Error fetching all animals:", error);
            return {
                message: "error",
                error: error.message,
            }
        }
    },

    getAllBreedsOfAnimal: async (type) => {
        try {
            const token = await getPetfinderToken();
            console.log(`Fetching all breeds of the animal: ${type}`);
            const res = await fetch(`${apiUrl}types/${type}/breeds`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            console.log("breeds data", data);
            const breedsList = data.breeds.map(breed => breed.name);
            return {
                message: "good",
                data: breedsList,
            }
        } catch (error) {
            console.error("Error fetching breeds:", error);
            return {
                message: "error",
                error: error.message,
            }
        }
    },

    getSingleAnimalType: async (type) => {
        try {
            const token = await getPetfinderToken();
            console.log(`Fetching info about the animal: ${type}`);
            const res = await fetch(`https://api.petfinder.com/v2/types/${type}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            console.log("animal data", data);
            const formattedData = {
                name: data.type.name,
                coats: data.type.coats,
                colors: data.type.colors,
                genders: data.type.genders,
            }

            return {
                message: "good",
                data: formattedData
            }

        } catch (error) {
        console.error("Error fetching breeds:", error);
            return {
                message: "error",
                error: error.message,
            }
        }

    },
}