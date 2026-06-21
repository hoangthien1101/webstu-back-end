import { HomepageServiceService } from './homepage-service.service';
import { CreateHomepageServiceDto } from './dto/create-homepage-service.dto';
import { UpdateHomepageServiceDto } from './dto/update-homepage-service.dto';
import { ReorderItemsDto } from './dto/reorder-items.dto';
export declare class HomepageServiceController {
    private readonly homepageServiceService;
    constructor(homepageServiceService: HomepageServiceService);
    findAll(activeOnly?: string): import("@prisma/client").Prisma.PrismaPromise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        description: string;
        title: string;
        icon: string;
        color: string;
        order: number;
        isActive: boolean;
    }[]>;
    getIcons(): readonly ["Camera", "Video", "Mic", "Music", "Image", "Monitor", "Headphones", "Film"];
    findOne(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        description: string;
        title: string;
        icon: string;
        color: string;
        order: number;
        isActive: boolean;
    }>;
    create(dto: CreateHomepageServiceDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        description: string;
        title: string;
        icon: string;
        color: string;
        order: number;
        isActive: boolean;
    }>;
    reorder(dto: ReorderItemsDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        description: string;
        title: string;
        icon: string;
        color: string;
        order: number;
        isActive: boolean;
    }[]>;
    update(id: string, dto: UpdateHomepageServiceDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        description: string;
        title: string;
        icon: string;
        color: string;
        order: number;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        description: string;
        title: string;
        icon: string;
        color: string;
        order: number;
        isActive: boolean;
    }>;
}
