import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File, options?: Record<string, any>): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
