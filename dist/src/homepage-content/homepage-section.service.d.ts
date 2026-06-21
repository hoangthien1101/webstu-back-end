import { HomepageSection } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateHomepageSectionDto } from './dto/update-homepage-section.dto';
export declare class HomepageSectionService {
    private prisma;
    constructor(prisma: PrismaService);
    getSections(): Promise<HomepageSection>;
    updateSections(dto: UpdateHomepageSectionDto): Promise<HomepageSection>;
}
