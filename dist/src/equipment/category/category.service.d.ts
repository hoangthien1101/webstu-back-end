import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCategoryDto): Promise<{
        createdAt: Date;
        id: string;
        name: string;
    }>;
    findAll(): Promise<{
        createdAt: Date;
        id: string;
        name: string;
    }[]>;
    update(id: string, dto: CreateCategoryDto): Promise<{
        createdAt: Date;
        id: string;
        name: string;
    }>;
    delete(id: string): Promise<{
        createdAt: Date;
        id: string;
        name: string;
    }>;
}
