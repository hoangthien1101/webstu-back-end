import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HomepageContentService } from './homepage-content.service';
export declare class HomepageBootstrapService implements OnModuleInit {
    private prisma;
    private homepageContentService;
    private readonly logger;
    constructor(prisma: PrismaService, homepageContentService: HomepageContentService);
    onModuleInit(): Promise<void>;
}
