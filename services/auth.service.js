
import { authDal } from '../dal/auth.dal.js'
import { userDal } from '../dal/user.dal.js'
import {hashPassword,verifyPassword} from '../utils/hash.js'
import { createToken,verifyToken } from '../utils/token.js'
import { createLogger } from '../utils/logger.js'


const logger = createLogger('AUTH-SERVICE');

export const authService = {
    registerUser: async (userData) => {
    try {
        logger.info(`starting to register user ${userData.email}`);
        logger.info('hashing password for user registration');
        const hashed = await hashPassword(userData.password);
        logger.info('Password hashed successfully');

        const user = {
            ...userData,
            password: hashed,
        };

        const result = await authDal.registerUser(user);
        logger.info(`User ${result.id} registered successfully`);

        const userWithoutPass = { ...result };
        delete userWithoutPass.password;

        logger.info(`Creating token for user ${result.id}`);
        const token = await createToken({ userId: result.id }, '1w');

        return {
            message: "User registered successfully",
            user: userWithoutPass,
            token: token
        };
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        throw error;
        }
    },
    logUser: async (username, password) => {
    try {
        console.log("Service: starting to log user", username);
        const user = await userDal.getUserByEmail(username, true);
        console.log(user);

        const hashedPassword = user.password;
        await verifyPassword(password, hashedPassword);

        const token = await createToken({ userId: user.id }, '1w');

        const userObj = { ...user };
        delete userObj.password;

        return {
            message: "User logged in successfully",
            token: token,
            user: userObj
        };
        } catch (error) {
        throw error;
        }
    }
}