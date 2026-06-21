import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<{
        createdAt: Date;
        id: string;
        name: string;
    }[]>;
    create(dto: CreateCategoryDto): Promise<{
        createdAt: Date;
        id: string;
        name: string;
    }>;
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
