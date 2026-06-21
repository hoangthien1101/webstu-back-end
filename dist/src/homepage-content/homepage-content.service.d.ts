import { OnModuleInit } from '@nestjs/common';
import { HomepageContent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateHomepageDto } from './dto/update-homepage.dto';
export declare class HomepageContentService implements OnModuleInit {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    getContent(): Promise<HomepageContent>;
    updateContent(dto: UpdateHomepageDto): Promise<HomepageContent>;
    private repairInvalidRecords;
    private findFirstSafely;
    private createDefaultContent;
    private buildFallbackContent;
}
