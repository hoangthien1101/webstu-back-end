import { HomepageContentService } from './homepage-content.service';
import { HomepageServiceService } from './homepage-service.service';
import { HomepageGalleryService } from './homepage-gallery.service';
import { HomepageSectionService } from './homepage-section.service';
export declare class HomepageAggregateService {
    private homepageContentService;
    private homepageServiceService;
    private homepageGalleryService;
    private homepageSectionService;
    constructor(homepageContentService: HomepageContentService, homepageServiceService: HomepageServiceService, homepageGalleryService: HomepageGalleryService, homepageSectionService: HomepageSectionService);
    getPublicHomepage(): Promise<{
        content: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            heroTitle: string;
            heroDescription: string;
            heroVideoUrl: string;
            heroPosterUrl: string | null;
            aboutContent: string;
            contactInfo: string;
        };
        services: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            isActive: boolean;
            description: string;
            color: string;
            title: string;
            icon: string;
            order: number;
        }[];
        gallery: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            isActive: boolean;
            title: string;
            order: number;
            imageUrl: string;
        }[];
        sections: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            showHero: boolean;
            showServices: boolean;
            showGallery: boolean;
            showAbout: boolean;
            showContact: boolean;
        };
    }>;
}
