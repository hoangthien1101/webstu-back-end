import { PrismaService } from '../prisma/prisma.service';
import { CreateHomepageGalleryDto } from './dto/create-homepage-gallery.dto';
import { UpdateHomepageGalleryDto } from './dto/update-homepage-gallery.dto';
import { ReorderItemsDto } from './dto/reorder-items.dto';
export declare class HomepageGalleryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(activeOnly?: boolean): import("@prisma/client").Prisma.PrismaPromise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        order: number;
        imageUrl: string;
    }[]>;
    findOne(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        order: number;
        imageUrl: string;
    }>;
    create(dto: CreateHomepageGalleryDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        order: number;
        imageUrl: string;
    }>;
    update(id: string, dto: UpdateHomepageGalleryDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        order: number;
        imageUrl: string;
    }>;
    remove(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        order: number;
        imageUrl: string;
    }>;
    reorder(dto: ReorderItemsDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        isActive: boolean;
        title: string;
        order: number;
        imageUrl: string;
    }[]>;
}
