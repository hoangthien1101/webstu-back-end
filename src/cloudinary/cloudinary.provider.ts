import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'placeholder',
      api_key: process.env.CLOUDINARY_API_KEY || 'placeholder',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'placeholder',
    });
  },
};
