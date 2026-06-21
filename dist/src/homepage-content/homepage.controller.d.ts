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
            description: string;
            title: string;
            icon: string;
            color: string;
            order: number;
            isActive: boolean;
        }[];
        gallery: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            title: string;
            order: number;
            isActive: boolean;
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
