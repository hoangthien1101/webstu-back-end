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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const nameLower = dto.name.trim();
        const existing = await this.prisma.equipmentCategory.findUnique({
            where: { name: nameLower },
        });
        if (existing) {
            throw new common_1.ConflictException('Danh mục này đã tồn tại');
        }
        return this.prisma.equipmentCategory.create({
            data: { name: nameLower },
        });
    }
    async findAll() {
        return this.prisma.equipmentCategory.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async update(id, dto) {
        const nameLower = dto.name.trim();
        const existing = await this.prisma.equipmentCategory.findUnique({
            where: { name: nameLower },
        });
        if (existing && existing.id !== id) {
            throw new common_1.ConflictException('Tên danh mục này đã tồn tại');
        }
        return this.prisma.equipmentCategory.update({
            where: { id },
            data: { name: nameLower },
        });
    }
    async delete(id) {
        const category = await this.prisma.equipmentCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.BadRequestException('Không tìm thấy danh mục');
        }
        const equipmentCount = await this.prisma.equipment.count({
            where: { category: category.name },
        });
        if (equipmentCount > 0) {
            throw new common_1.BadRequestException(`Không thể xóa danh mục này do đang có ${equipmentCount} thiết bị sử dụng`);
        }
        return this.prisma.equipmentCategory.delete({
            where: { id },
        });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map