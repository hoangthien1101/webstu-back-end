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
exports.HomepageGalleryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HomepageGalleryService = class HomepageGalleryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(activeOnly = false) {
        return this.prisma.homepageGallery.findMany({
            where: activeOnly ? { isActive: true } : undefined,
            orderBy: { order: 'asc' },
        });
    }
    async findOne(id) {
        const item = await this.prisma.homepageGallery.findUnique({ where: { id } });
        if (!item) {
            throw new common_1.NotFoundException('Không tìm thấy hình ảnh gallery');
        }
        return item;
    }
    async create(dto) {
        const maxOrder = await this.prisma.homepageGallery.aggregate({
            _max: { order: true },
        });
        return this.prisma.homepageGallery.create({
            data: {
                ...dto,
                order: dto.order ?? (maxOrder._max.order ?? -1) + 1,
                isActive: dto.isActive ?? true,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.homepageGallery.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.homepageGallery.delete({ where: { id } });
    }
    async reorder(dto) {
        await this.prisma.$transaction(dto.items.map((item) => this.prisma.homepageGallery.update({
            where: { id: item.id },
            data: { order: item.order },
        })));
        return this.findAll();
    }
};
exports.HomepageGalleryService = HomepageGalleryService;
exports.HomepageGalleryService = HomepageGalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomepageGalleryService);
//# sourceMappingURL=homepage-gallery.service.js.map