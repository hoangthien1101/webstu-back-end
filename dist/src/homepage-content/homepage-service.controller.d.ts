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
        isActive: boolean;
        description: string;
        color: string;
        title: string;
        icon: string;
        order: number;
    }[]>;
    getIcons(): readonly ["Camera", "Video", "Mic", "Music", "Image", "Monitor", "Headphones", "Film"];
    findOne(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        description: string;
        color: string;
        title: string;
        icon: string;
        order: number;
    }>;
    create(dto: CreateHomepageServiceDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        description: string;
        color: string;
        title: string;
        icon: string;
        order: number;
    }>;
    reorder(dto: ReorderItemsDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        description: string;
        color: string;
        title: string;
        icon: string;
        order: number;
    }[]>;
    update(id: string, dto: UpdateHomepageServiceDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        description: string;
        color: string;
        title: string;
        icon: string;
        order: number;
    }>;
    remove(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        description: string;
        color: string;
        title: string;
        icon: string;
        order: number;
    }>;
}
