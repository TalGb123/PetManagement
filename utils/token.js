import jwt from 'jsonwebtoken'
import  {jwtKey} from '../config/index.js'
import { api_key, api_secret } from '../config/index.js'


export const createToken = async (payload, expiresIn = '24h') => {
    return await jwt.sign(payload,jwtKey,{ expiresIn})
}
export const verifyToken = async(token) => {
    return await jwt.verify(token,jwtKey)
} 

let petfinderTokenData = null;
export const fetchPetfinderToken = async () => {
    const url = 'https://api.petfinder.com/v2/oauth2/token';
    
    const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: api_key,
        client_secret: api_secret
    });

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
    });
    
    if (!res.ok) {
        const errorText = await res.text();
        console.log('Error response:', errorText);
        throw new Error(`Token fetch failed: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    
    petfinderTokenData = {
        access_token: data.access_token,
        expires_in: data.expires_in, 
        timestamp: Date.now()
    };
    
    return data;
};

export const isPetfinderTokenExpired = () => {
    if (!petfinderTokenData) {
        return true; 
    }
    
    const currentTime = Date.now();
    const tokenAge = currentTime - petfinderTokenData.timestamp;
    const tokenLifetime = petfinderTokenData.expires_in * 1000; 
    
    const buffer = 5 * 60 * 1000;
    
    return tokenAge >= (tokenLifetime - buffer);
};

export const getPetfinderToken = async () => {
    if (isPetfinderTokenExpired()) {
        console.log("Petfinder token expired or missing, fetching new one...");
        await fetchPetfinderToken();
    }
    
    return petfinderTokenData.access_token;
};
