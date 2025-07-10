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

    logger.info(`Action ${req.method} on user ${id}`);

    switch (req.method) {
      case "PUT":
        response = await userService.updateUserById(id, userData);
        break;

      case "DELETE":
        response = await userService.deleteUserById(id);
        break;

      default:
        response = await userService.getUserById(id);
    }

    if (!response)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
    try {
        logger.info('Creating new user');
        const userData = req.body;
        
        const result = await userService.createUser(userData);
        
        if (result.success) {
            res.status(201).json({
                URL: `http://localhost:6000/api/users`,
                message: "User created successfully",
                user: result.user
            });
        } else {
            res.status(400).json({
                message: "Failed to create user",
                errors: result.errors
            });
        }
    } catch (error) {
        logger.error(`Error in createUser: ${error.message}`);
        res.status(500).json({ 
            message: "Failed to create user", 
            error: error.message 
        });
    }
};

export const addAnimalToUser = async (req, res) => {
  try {
    const { userId, animalId } = req.params;
    
    logger.info(`Adding animal ${animalId} to user ${userId}`);
    
    const result = await userService.addAnimalToUser(userId, animalId);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in addAnimalToUser: ${error.message}`);
    res.status(500).json({ 
      message: "Failed to add animal to user", 
      error: error.message 
    });
  }
};




