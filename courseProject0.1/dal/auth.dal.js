
import User from "../models/user.model.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger('AUTH-DAL');



export const authDal = {

    registerUser: async (user) => {
    try {
        logger.info(`Starting validaion for user ${user.email}`);
        const validUser = new User(user);

        logger.info('Saving user to the database');
        await validUser.save()
        logger.info(`User ${user.email} Saved successfully`);
        return validUser;

    } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
        throw error
    }
  } 
} 