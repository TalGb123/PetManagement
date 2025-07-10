import { userDal } from "../dal/user.dal.js";
import { dateTimeFormater_il } from "../utils/dateTimeFormater_il.js";
import { createLogger } from "../utils/logger.js";
import { PetService } from "./pet.service.js"; 
import { port } from "../config/index.js";

const API_URL = `http://localhost:${port}/api/users`;
const logger = createLogger('USER-SERVICE');

export const userService = {
  getAllUsers: async () => {
    try {
      logger.info('Fetching all users');
      const users = await userDal.getAllUsers();
      logger.info(`Retrieved ${users.length} users from the database`);
      return {
        URL: API_URL,
        message: `Retrieved all users from DB`,
        users: users,
      };
    } catch (error) {
      logger.error(`Error fetching all users: ${error.message}`);
      throw error
    }
  },

  createUser: async (userData) => {
    try {
        logger.info('Creating new user in service');
        const result = await userDal.createUser(userData);
        return result;
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        throw error;
    }
  },

  getUserById: async (id) => {
    try {
      console.log('Fetching user for id ', id);
      const user = await userDal.getUserById(id);
      if (!user) throw new Error("User not found");

      // Format timestamps if needed
      const formatedUser = { ...user };
      if (user.createdAt)
        formatedUser.createdAt = dateTimeFormater_il.formatDateTime(user.createdAt);
      if (user.updatedAt)
        formatedUser.updatedAt = dateTimeFormater_il.formatDateTime(user.updatedAt);

      // Get user's pets from Petfinder API
      let userPets = [];
      if (user.pet_ids && user.pet_ids.length > 0) {
        try {
          const petPromises = user.pet_ids.map(petId => PetService.getAnimalById(petId));
          const petResults = await Promise.all(petPromises);
          userPets = petResults
            .filter(result => result.message === "good")
            .map(result => result.data);
        } catch (error) {
          console.error(`Error fetching pets for user ${user.name}:`, error);
        }
      }

      return {
        URL: `${API_URL}/${id}`,
        message: `Fetched user by id: ${id}`,
        user: formatedUser,
        pets: userPets,
      };
    } catch (error) {
      throw error;
    }
  },

  updateUserById: async (id, userData) => {
    try {
      logger.info(`Updating user with ID: ${id}`);
      const updatedUser = await userDal.updateUserById(id, userData);
      if (!updatedUser) return null;
      return {
        URL: `${API_URL}/${id}`,
        message: `Updated user by id:${id}`,
        user: updatedUser,
      };
    } catch (error) {
      logger.error(`Error updating user with ID: ${id} - ${error.message}`);
      throw error;
    }
  },

  deleteUserById: async (id) => {
    try {
      console.log('Deleting user for id ', id);
      const deletedUser = await userDal.deleteUserById(id);
      if (!deletedUser) return null;
      return {
        URL: `${API_URL}/${id}`,
        message: `Deleted user by id:${id}`,
        user: deletedUser,
      };
    } catch (error) {
      logger.error(`Error deleting user with ID: ${id} - ${error.message}`);
      throw error;
    }
  },

  addAnimalToUser: async (userId, animalId) => {
    try {
      logger.info(`Adding animal with ID: ${animalId} to user with ID: ${userId}`);
      
      // First, verify the animal exists in Petfinder API
      const animalResult = await PetService.getAnimalById(animalId);
      if (animalResult.message !== "good") {
        throw new Error(`Animal with ID ${animalId} not found in Petfinder`);
      }

      // Add animal to user
      const updatedUser = await userDal.addAnimalToUser(userId, animalId);
      if (!updatedUser) {
        throw new Error(`User with ID ${userId} not found`);
      }

      logger.info(`Animal with ID: ${animalId} added to user with ID: ${userId}`);
      return {
        URL: `${API_URL}/${userId}/animals`,
        message: `Added animal to user by id:${userId}`,
        user: updatedUser,
        addedAnimal: animalResult.data,
      };
    } catch (error) {
      logger.error(`Error adding animal to user with ID: ${userId} - ${error.message}`);
      throw error;
    }
  },
}