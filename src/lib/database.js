import mongoose from 'mongoose';
import { MONGO_URI } from '$env/static/private';  

let isConnected = false;

export async function connectToDatabase() {
    if (!MONGO_URI) {
        throw new Error('MongoDB URI is not defined in environment variables');
        
    }

    if (!isConnected) {
        try {
            await mongoose.connect(MONGO_URI);
            isConnected = true;
            console.log('Connected to MongoDB Atlas');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
}