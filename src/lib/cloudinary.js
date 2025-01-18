import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Verify environment variables are available
const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload function with proper promise handling and retry mechanism.
 * 
 * @param {Buffer | ArrayBuffer} file - The file to upload.
 * @param {number} retries - Number of retries in case of failure.
 * @returns {Promise<{ path: string }>} The result of the upload.
 */
export async function uploadImage(file, retries = 3) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Convert ArrayBuffer to Buffer if needed
    const buffer = Buffer.from(file instanceof ArrayBuffer ? file : file);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'deals',
          timeout: 60000 // Increase timeout to 60 seconds
        },
        (error, result) => {
          if (error) {
            console.error('Failed to upload image:', error);
            if (retries > 0) {
              console.log(`Retrying upload... (${retries} retries left)`);
              return resolve(uploadImage(file, retries - 1));
            }
            return reject(new Error('Image upload failed'));
          }
          resolve({ path: result.secure_url });
        }
      );

      // Handle upload stream errors
      uploadStream.on('error', (error) => {
        console.error('Upload stream error:', error);
        reject(error);
      });

      // Upload the file
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
}

export default cloudinary;
