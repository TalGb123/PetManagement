import User from "../models/user.model.js";
import { createLogger } from "../utils/logger.js";


const logger = createLogger('USER-DAL');



export const userDal = {

    getAllUsers: async (user) => {
        try {
            logger.info('Fetching all users from the database');
            const users = await User.find();
            logger.info(`Retrieved ${users.length} users`);
            return users;

        } catch (error) {
            logger.error(`Error fetching all users: ${error.message}`);
            throw error
        }
    },
    getUserById: async (id) => {
        try {

            const user = await User.findById(id);
            return user;

        } catch (error) {
            throw error
        }
    },
    getUserByEmail: async (username, fromLogin = false) => {
        try {

            if (fromLogin)
                return await User.findOne({ email: username }).select('+password');

            return await User.findOne({ email: username })

        } catch (error) {
            throw error
        }
    },
    updateUserById:async (id, userData) => {
        try {
            return await User.findByIdAndUpdate(
                id ,
                userData,   
            { new: true }
        );

        } catch (error) {
            logger.error(`Error updating user with ID ${id}: ${error.message}`);
            throw error
        }
    },
    deleteUserById: async (id) => {
        try {
            logger.info(`Deleting user with ID: ${id}`);
            const deletedUser = await User.findByIdAndDelete(id);
            logger.info(`User with ID: ${id} deleted successfully`);
            return deletedUser;
        } catch (error) {
            logger.error(`Error deleting user with ID ${id}: ${error.message}`);
            throw error;
        }
    }

} 