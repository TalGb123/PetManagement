import { authService } from "../services/auth.service.js";
import { createLogger } from "../utils/logger.js";
 const logger = createLogger('AUTH-CONTROLLER');

export const registerUser = async (req, res) => {
    try {
        logger.info('Registering new user');
        const userRegisterData = req.body;
        const response = await authService.registerUser(userRegisterData);
        logger.info(`User registered successfully: ${response.user._id}`);
        res.status(201).json(response)

    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        res.status(500).json({ message: error.message })
    }
}
export const logUser = async (req, res) => {
    try {

        const {username,password} = req.body;
        const response = await authService.logUser(username,password);
        res.status(200).json(response)

    } catch (error) {
        if (error.message === "Invalid username or password")
            return res.status(401).json({ message: error.message })

        return res.status(500).json({ message: error.message })
        
    }
}