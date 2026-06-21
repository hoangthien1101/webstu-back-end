import { HomepageContentService } from './homepage-content.service';
import { UpdateHomepageDto } from './dto/update-homepage.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class HomepageContentController {
    private readonly homepageContentService;
    private readonly cloudinaryService;
    constructor(homepageContentService: HomepageContentService, cloudinaryService: CloudinaryService);
    getContent(): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        heroTitle: string;
        heroDescription: string;
        heroVideoUrl: string;
        heroPosterUrl: string | null;
        aboutContent: string;
        contactInfo: string;
    }>;
    updateContent(dto: UpdateHomepageDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        heroTitle: string;
        heroDescription: string;
        heroVideoUrl: string;
        heroPosterUrl: string | null;
        aboutContent: string;
        contactInfo: string;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<{
        url: any;
    }>;
    uploadPoster(file: Express.Multer.File): Promise<{
        url: any;
    }>;
}
