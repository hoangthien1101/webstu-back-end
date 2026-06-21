import { HomepageSectionService } from './homepage-section.service';
import { UpdateHomepageSectionDto } from './dto/update-homepage-section.dto';
export declare class HomepageSectionController {
    private readonly homepageSectionService;
    constructor(homepageSectionService: HomepageSectionService);
    getSections(): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        showHero: boolean;
        showServices: boolean;
        showGallery: boolean;
        showAbout: boolean;
        showContact: boolean;
    }>;
    updateSections(dto: UpdateHomepageSectionDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        showHero: boolean;
        showServices: boolean;
        showGallery: boolean;
        showAbout: boolean;
        showContact: boolean;
    }>;
}
