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
var HomepageBootstrapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageBootstrapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const homepage_defaults_1 = require("./homepage.defaults");
const homepage_content_service_1 = require("./homepage-content.service");
let HomepageBootstrapService = HomepageBootstrapService_1 = class HomepageBootstrapService {
    prisma;
    homepageContentService;
    logger = new common_1.Logger(HomepageBootstrapService_1.name);
    constructor(prisma, homepageContentService) {
        this.prisma = prisma;
        this.homepageContentService = homepageContentService;
    }
    async onModuleInit() {
        try {
            await this.homepageContentService.getContent();
            const serviceCount = await this.prisma.homepageService.count();
            if (serviceCount === 0) {
                await this.prisma.homepageService.createMany({
                    data: homepage_defaults_1.DEFAULT_HOMEPAGE_SERVICES,
                });
                this.logger.log(`Seeded ${homepage_defaults_1.DEFAULT_HOMEPAGE_SERVICES.length} default homepage services`);
            }
            const galleryCount = await this.prisma.homepageGallery.count();
            if (galleryCount === 0) {
                await this.prisma.homepageGallery.createMany({
                    data: homepage_defaults_1.DEFAULT_HOMEPAGE_GALLERY,
                });
                this.logger.log(`Seeded ${homepage_defaults_1.DEFAULT_HOMEPAGE_GALLERY.length} default homepage gallery items`);
            }
            const section = await this.prisma.homepageSection.findFirst();
            if (!section) {
                await this.prisma.homepageSection.create({
                    data: homepage_defaults_1.DEFAULT_HOMEPAGE_SECTION,
                });
                this.logger.log('Seeded default homepage section visibility settings');
            }
        }
        catch (error) {
            this.logger.error('Homepage bootstrap seeding failed', error instanceof Error ? error.stack : String(error));
        }
    }
};
exports.HomepageBootstrapService = HomepageBootstrapService;
exports.HomepageBootstrapService = HomepageBootstrapService = HomepageBootstrapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        homepage_content_service_1.HomepageContentService])
], HomepageBootstrapService);
//# sourceMappingURL=homepage-bootstrap.service.js.map