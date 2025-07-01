import { userDal } from "../dal/user.dal.js";
import { weatherService } from './weather.service.js'
import { dateTimeFormater_il } from "../utils/dateTimeFormater_il.js";
import { createLogger } from "../utils/logger.js";


const API_URL = "http://localhost:5000/api/users"
const logger = createLogger('USER-SERVICE');

export const userService = {
    getAllUsers: async () => {
        try {
            logger.info('Fetching all users');
            const users = await userDal.getAllUsers();
            logger.info(`Retrieved ${users.length} users from the database`);
            // logger.debug(`Users data:${JSON.stringify(users)}`);
            logger.warn('This is a test warning message'); // Example of a warning log
            return {
                URL: API_URL,
                message: `Retrived all users from DB `,
                users: users,
            };;
        

        } catch (error) {
            logger.error(`Error fetching all users: ${error.message}`);
            throw error
        }
    },
    getUserById: async (id) => {
        try {
            console.log('Fetching user for id ', id);
            const user = await userDal.getUserById(id)
            console.log(`User found`, user);

            let userWeather = {};
            try {
                userWeather = await weatherService.getWeatherByCity(user.city) || {}
            } catch (error) {
                console.error(`Error fetching weather for user ${user.name}:`, error);
            }
            let formatedUser = user.toObject();

            formatedUser.createdAt = dateTimeFormater_il.formatDateTime(user.createdAt);
            formatedUser.updatedAt = dateTimeFormater_il.formatDateTime(user.updatedAt);

            return {
                URL: `${API_URL}/${id}`,
                message: `fetched user by id:${id}`,
                user: formatedUser,
                weather: userWeather.data || {},
            };
        } catch (error) {
            throw error
        }
    },
    updateUserById: async (id, userData) => {
        try {
            logger.info(`Updating user with ID: ${id}`);
            logger.debug(`User data to update: ${JSON.stringify(userData)}`);
            const updatedUser = await userDal.updateUserById(id, userData);
            logger.info(`User with ID: ${id} updated successfully`);
            logger.debug(`Updated user data: ${JSON.stringify(updatedUser)}`);
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
            logger.info(`User with ID: ${id} deleted successfully`);
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

}


