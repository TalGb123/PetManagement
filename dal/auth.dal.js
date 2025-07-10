import { createUser, findUserByEmail } from "../models/user.model.js";

export const authDal = {
    registerUser: async (userData) => {
        try {
            const result = createUser(userData);
            return result;
        } catch (error) {
            throw error;
        }
    },

    loginUser: async (email) => {
        try {
            const user = findUserByEmail(email);
            return user;
        } catch (error) {
            throw error;
        }
    }
};