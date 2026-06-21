"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageAggregateService = void 0;
const common_1 = require("@nestjs/common");
const homepage_content_service_1 = require("./homepage-content.service");
const homepage_service_service_1 = require("./homepage-service.service");
const homepage_gallery_service_1 = require("./homepage-gallery.service");
const homepage_section_service_1 = require("./homepage-section.service");
let HomepageAggregateService = class HomepageAggregateService {
    homepageContentService;
    homepageServiceService;
    homepageGalleryService;
    homepageSectionService;
    constructor(homepageContentService, homepageServiceService, homepageGalleryService, homepageSectionService) {
        this.homepageContentService = homepageContentService;
        this.homepageServiceService = homepageServiceService;
        this.homepageGalleryService = homepageGalleryService;
        this.homepageSectionService = homepageSectionService;
    }
    async getPublicHomepage() {
        const [content, services, gallery, sections] = await Promise.all([
            this.homepageContentService.getContent(),
            this.homepageServiceService.findAll(true),
            this.homepageGalleryService.findAll(true),
            this.homepageSectionService.getSections(),
        ]);
        return {
            content,
            services,
            gallery,
            sections,
        };
    }
};
exports.HomepageAggregateService = HomepageAggregateService;
exports.HomepageAggregateService = HomepageAggregateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [homepage_content_service_1.HomepageContentService,
        homepage_service_service_1.HomepageServiceService,
        homepage_gallery_service_1.HomepageGalleryService,
        homepage_section_service_1.HomepageSectionService])
], HomepageAggregateService);
//# sourceMappingURL=homepage-aggregate.service.js.map