import { PrismaService } from '../prisma/prisma.service';
import { CreateHomepageServiceDto } from './dto/create-homepage-service.dto';
import { UpdateHomepageServiceDto } from './dto/update-homepage-service.dto';
import { ReorderItemsDto } from './dto/reorder-items.dto';
export declare class HomepageServiceService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(activeOnly?: boolean): import("@prisma/client").Prisma.PrismaPromise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        description: string;
        icon: string;
        color: string;
        order: number;
    }[]>;
    findOne(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        description: string;
        icon: string;
        color: string;
        order: number;
    }>;
    create(dto: CreateHomepageServiceDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        description: string;
        icon: string;
        color: string;
        order: number;
    }>;
    update(id: string, dto: UpdateHomepageServiceDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        description: string;
        icon: string;
        color: string;
        order: number;
    }>;
    remove(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        description: string;
        icon: string;
        color: string;
        order: number;
    }>;
    reorder(dto: ReorderItemsDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        description: string;
        icon: string;
        color: string;
        order: number;
    }[]>;
}
