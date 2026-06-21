import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { HomepageGalleryService } from './homepage-gallery.service';
import { CreateHomepageGalleryDto } from './dto/create-homepage-gallery.dto';
import { UpdateHomepageGalleryDto } from './dto/update-homepage-gallery.dto';
import { ReorderItemsDto } from './dto/reorder-items.dto';
export declare class HomepageGalleryController {
    private readonly homepageGalleryService;
    private readonly cloudinaryService;
    constructor(homepageGalleryService: HomepageGalleryService, cloudinaryService: CloudinaryService);
    findAll(activeOnly?: string): import("@prisma/client").Prisma.PrismaPromise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        title: string;
        order: number;
        isActive: boolean;
        imageUrl: string;
    }[]>;
    findOne(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        title: string;
        order: number;
        isActive: boolean;
        imageUrl: string;
    }>;
    create(dto: CreateHomepageGalleryDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        title: string;
        order: number;
        isActive: boolean;
        imageUrl: string;
    }>;
    uploadImage(file: Express.Multer.File): Promise<{
        url: any;
    }>;
    reorder(dto: ReorderItemsDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        title: string;
        order: number;
        isActive: boolean;
        imageUrl: string;
    }[]>;
    update(id: string, dto: UpdateHomepageGalleryDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        title: string;
        order: number;
        isActive: boolean;
        imageUrl: string;
    }>;
    remove(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        title: string;
        order: number;
        isActive: boolean;
        imageUrl: string;
    }>;
}
