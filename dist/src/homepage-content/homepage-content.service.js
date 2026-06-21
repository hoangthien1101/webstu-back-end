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
var HomepageContentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageContentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const homepage_content_defaults_1 = require("./homepage-content.defaults");
const homepage_content_repair_1 = require("./homepage-content.repair");
let HomepageContentService = HomepageContentService_1 = class HomepageContentService {
    prisma;
    logger = new common_1.Logger(HomepageContentService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        try {
            await this.repairInvalidRecords();
            const existing = await this.findFirstSafely();
            if (!existing) {
                await this.createDefaultContent();
                this.logger.log('Seeded default HomepageContent on application startup');
            }
        }
        catch (error) {
            this.logger.error('HomepageContent startup initialization failed; homepage will use runtime fallbacks', error instanceof Error ? error.stack : String(error));
        }
    }
    async getContent() {
        try {
            await this.repairInvalidRecords();
            const content = await this.findFirstSafely();
            if (content) {
                return content;
            }
            return await this.createDefaultContent();
        }
        catch (error) {
            this.logger.error('Failed to load HomepageContent from database', error instanceof Error ? error.stack : String(error));
            return this.buildFallbackContent();
        }
    }
    async updateContent(dto) {
        await this.repairInvalidRecords();
        const existing = await this.findFirstSafely();
        if (existing) {
            return this.prisma.homepageContent.update({
                where: { id: existing.id },
                data: dto,
            });
        }
        return this.prisma.homepageContent.create({
            data: {
                ...homepage_content_defaults_1.DEFAULT_HOMEPAGE_CONTENT,
                ...dto,
            },
        });
    }
    async repairInvalidRecords() {
        try {
            await (0, homepage_content_repair_1.repairHomepageContentDateFields)(this.prisma);
        }
        catch (error) {
            this.logger.error('HomepageContent date-field repair failed', error instanceof Error ? error.stack : String(error));
        }
    }
    async findFirstSafely() {
        try {
            return await this.prisma.homepageContent.findFirst();
        }
        catch (error) {
            if (!(0, homepage_content_repair_1.isPrismaDateConversionError)(error)) {
                throw error;
            }
            this.logger.warn('Detected invalid HomepageContent DateTime values (P2032); running repair and retrying');
            await this.repairInvalidRecords();
            return await this.prisma.homepageContent.findFirst();
        }
    }
    async createDefaultContent() {
        try {
            return await this.prisma.homepageContent.create({
                data: homepage_content_defaults_1.DEFAULT_HOMEPAGE_CONTENT,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                const existing = await this.findFirstSafely();
                if (existing) {
                    return existing;
                }
            }
            this.logger.error('Failed to create default HomepageContent', error instanceof Error ? error.stack : String(error));
            return this.buildFallbackContent();
        }
    }
    buildFallbackContent() {
        const now = new Date();
        return {
            id: 'fallback-homepage-content',
            ...homepage_content_defaults_1.DEFAULT_HOMEPAGE_CONTENT,
            heroPosterUrl: homepage_content_defaults_1.DEFAULT_HOMEPAGE_CONTENT.heroPosterUrl ?? null,
            createdAt: now,
            updatedAt: now,
        };
    }
};
exports.HomepageContentService = HomepageContentService;
exports.HomepageContentService = HomepageContentService = HomepageContentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomepageContentService);
//# sourceMappingURL=homepage-content.service.js.map