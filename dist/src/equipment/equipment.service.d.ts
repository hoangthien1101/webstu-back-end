import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentStatus } from '@prisma/client';
export declare class EquipmentService {
    private prisma;
    constructor(prisma: PrismaService);
    validateCategory(categoryName: string): Promise<void>;
    findAll(query: {
        search?: string;
        category?: string;
        status?: EquipmentStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            name: string;
            code: string;
            category: string;
            description: string;
            image: string;
            quantity: number;
            availableQuantity: number;
            status: import("@prisma/client").$Enums.EquipmentStatus;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        categories: string[];
    }>;
    findOne(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        name: string;
        code: string;
        category: string;
        description: string;
        image: string;
        quantity: number;
        availableQuantity: number;
        status: import("@prisma/client").$Enums.EquipmentStatus;
    }>;
    create(dto: CreateEquipmentDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        name: string;
        code: string;
        category: string;
        description: string;
        image: string;
        quantity: number;
        availableQuantity: number;
        status: import("@prisma/client").$Enums.EquipmentStatus;
    }>;
    update(id: string, dto: UpdateEquipmentDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        name: string;
        code: string;
        category: string;
        description: string;
        image: string;
        quantity: number;
        availableQuantity: number;
        status: import("@prisma/client").$Enums.EquipmentStatus;
    }>;
    delete(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        name: string;
        code: string;
        category: string;
        description: string;
        image: string;
        quantity: number;
        availableQuantity: number;
        status: import("@prisma/client").$Enums.EquipmentStatus;
    }>;
}
