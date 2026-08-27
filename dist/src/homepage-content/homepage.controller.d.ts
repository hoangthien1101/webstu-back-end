import { HomepageAggregateService } from './homepage-aggregate.service';
export declare class HomepageController {
    private readonly homepageAggregateService;
    constructor(homepageAggregateService: HomepageAggregateService);
    getHomepage(): Promise<{
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
