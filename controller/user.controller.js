
import { userService } from "../services/user.service.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger('USER-CONTROLLER');




export const getAllUsers = async (req, res) => {
    try {
        logger.info('Fetching all users');
        const users = await userService.getAllUsers();
        logger.info(`Retrieved ${users.users.length} users from the database`);
        res.status(200).json(users);

    } catch (error) {
        logger.error(`Error fetching all users: ${error.message}`);
        res.status(500).json({ message: error.message })
    }
}
export const userActionById = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        let response;
        logger.info(`Performing action ${req.method} on user with ID: ${req.params.id}`);
        switch (req.method) {
            case 'PUT':{
                response = await userService.updateUserById(id,userData);
                break;
            }
             
            case 'DELETE':{
                response = await userService.deleteUserById(id);
                break;
            }
             
            default:
                 response = await userService.getUserById(id);
        }
       
        if (!response) 
            return res.status(404).json({ message: 'User not found' });
    
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



