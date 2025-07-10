import validator from 'validator';
import { users } from '../data/users.js';

function validateUser(user) {
    const errors = [];

    if (!user.name || typeof user.name !== 'string') {
        errors.push("Name is required and must be a string");
    }

    if (!user.email || !validator.isEmail(user.email)) {
        errors.push("A valid email is required");
    }

    if (!user.city || typeof user.city !== 'string') {
        errors.push("City is required and must be a string");
    }

    if (!user.age || typeof user.age !== 'number' || user.age < 18) {
        errors.push("Age must be a number greater than or equal to 18");
    }

    if (!user.password || user.password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }

    return errors;
}

function createUser(user) {
    const errors = validateUser(user);
    if (errors.length > 0) {
        return { success: false, errors };
    }

    // Check if email is unique
    const existingUser = users.find(u => u.email === user.email.toLowerCase());
    if (existingUser) {
        return { success: false, errors: ["Email already exists"] };
    }

    // Clean up & push
    const newUser = {
        ...user,
        email: user.email.toLowerCase().trim(),
        city: user.city.toLowerCase().replace(/\s+/g, ''),
        name: user.name.trim(),
        password: user.password.trim(),
        id: Date.now().toString(), // Simulate an ID
        pet_ids: [],
    };

    users.push(newUser);
    return { success: true, user: newUser };
}

function getAllUsers() {
    return users;
}

function findUserByEmail(email) {
    return users.find(u => u.email === email.toLowerCase());
}

export {
    createUser,
    getAllUsers,
    findUserByEmail,
};

