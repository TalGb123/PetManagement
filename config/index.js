import "dotenv/config.js";

export const port = process.env.PORT
export const api_key = process.env.API_KEY
export const api_secret = process.env.API_SECRET
export const jwtKey = process.env.JWT_SECRET
export const mongoDbUri = process.env.MONGODB_URI
export const appMode = process.env.MODE