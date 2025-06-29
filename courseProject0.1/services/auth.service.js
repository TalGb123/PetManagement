
import { authDal } from '../dal/auth.dal.js'
import { userDal } from '../dal/user.dal.js'
import {hashPassword,verifyPassword} from '../utils/hash.js'
import { createToken,verifyToken } from '../utils/token.js'
import { createLogger } from '../utils/logger.js'


const logger = createLogger('AUTH-SERVICE');

export const authService = {
    registerUser:async (userData) => {
        try {
            logger.info(`starting to register user ${userData.email}`);
            logger.info('hashing password for user registration');
            const hashed = await hashPassword(userData.password);
            logger.info('Password hashed successfully');
            logger.debug(`Hashed password: ${hashed}`);
            const user = {
                ...userData,
                password:hashed, 
            }
            
            const result =  await authDal.registerUser(user)
            logger.info(`User ${result._id} registered successfully`);

            const userWithoutPass = result.toObject();
            delete userWithoutPass.password;

            logger.info(`Creating token for user ${userWithoutPass._id}`);
            const token = await createToken({userId:user.id},'1w')
            logger.info(`Token created successfully for user ${userWithoutPass._id}`);
            logger.debug(`Token: ${token}`);
            return {
                message:"User registered seccsessfuly",
                user:userWithoutPass,
                token:token
            }
           
        } catch (error) {
            logger.error(`Error registering user: ${error.message}`);
            throw error
        }
    },
    logUser: async(username,password) => {
        try {
            console.log("Service : starting to log user",username);
            const user = await userDal.getUserByEmail(username,true)
            console.log(user);
            const hashedPassword = await user.password
             await verifyPassword(password,hashedPassword);
             const token = await createToken({userId:user._id},'1w')

             const userObj = user.toObject();
             delete userObj.password;

             console.log(userObj);
                return {
                    message:"User logged secsessfuly",
                    token:token,
                    user:userObj
                }
     
        

        } catch (error) {
            throw error
        }
    }
}