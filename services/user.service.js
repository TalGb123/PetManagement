import { userDal } from "../dal/user.dal.js";
import { dateTimeFormater_il } from "../utils/dateTimeFormater_il.js";
import { createLogger } from "../utils/logger.js";
import { getAllAnimals } from "../models/animal.model.js";


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
        const user = await userDal.getUserById(id);
        if (!user) throw new Error("User not found");

        // Format timestamps if needed
        const formatedUser = { ...user };
        if (user.createdAt)
            formatedUser.createdAt = dateTimeFormater_il.formatDateTime(user.createdAt);
        if (user.updatedAt)
            formatedUser.updatedAt = dateTimeFormater_il.formatDateTime(user.updatedAt);

        // Get pets by matching pet_ids
        const userPets = getAllAnimals().filter(pet =>
            user.pet_ids?.includes(pet.id)
        );

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


