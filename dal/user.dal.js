import { createLogger } from "../utils/logger.js";
import { createUser, getAllUsers, findUserByEmail } from "../models/user.model.js";

const logger = createLogger("USER-DAL");

export const userDal = {
  getAllUsers: async () => {
    try {
      logger.info("Fetching all users from memory");
      const users = getAllUsers();
      return users;
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      throw error;
    }
  },

  createUser: async (userData) => {
      try {
          logger.info('Creating user in DAL');
          const result = createUser(userData);
          return result;
      } catch (error) {
          logger.error(`Error creating user in DAL: ${error.message}`);
          throw error;
      }
  },

  getUserById: async (id) => {
    try {
      const users = getAllUsers();
      return users.find((u) => u.id === id) || null;
    } catch (error) {
      throw error;
    }
  },

  getUserByEmail: async (email) => {
    try {
      return findUserByEmail(email);
    } catch (error) {
      throw error;
    }
  },

  updateUserById: async (id, userData) => {
    try {
      const users = getAllUsers();
      const user = users.find((u) => u.id === id);
      if (!user) return null;

      Object.assign(user, userData);
      return user;
    } catch (error) {
      logger.error(`Error updating user ${id}: ${error.message}`);
      throw error;
    }
  },

  deleteUserById: async (id) => {
    try {
      const users = getAllUsers();
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return null;

      const deleted = users.splice(index, 1)[0];
      return deleted;
    } catch (error) {
      logger.error(`Error deleting user ${id}: ${error.message}`);
      throw error;
    }
  },

  addAnimalToUser: async (userId, animalId) => {
    try {
      const users = getAllUsers();
      const user = users.find((u) => u.id === userId);
      if (!user) return null;

      // Initialize pet_ids array if it doesn't exist
      if (!user.pet_ids) {
        user.pet_ids = [];
      }

      // Check if animal is already added
      if (!user.pet_ids.includes(animalId)) {
        user.pet_ids.push(animalId);
      }

      return user;
    } catch (error) {
      logger.error(`Error adding animal to user ${userId}: ${error.message}`);
      throw error;
    }
  },
};
