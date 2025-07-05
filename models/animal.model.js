import { animals } from "../data/animals.js";

export function getAllAnimals() {
  return animals;
}

export function getAnimalById(id) {
  return animals.find(animal => animal.id === id);
}