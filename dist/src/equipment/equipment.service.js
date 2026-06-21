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
exports.EquipmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let EquipmentService = class EquipmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateCategory(categoryName) {
        const category = await this.prisma.equipmentCategory.findUnique({
            where: { name: categoryName },
        });
        if (!category) {
            throw new common_1.BadRequestException(`Danh mục '${categoryName}' không hợp lệ hoặc chưa được tạo`);
        }
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { code: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.category) {
            where.category = query.category;
        }
        if (query.status) {
            where.status = query.status;
        }
        const [items, total] = await Promise.all([
            this.prisma.equipment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.equipment.count({ where }),
        ]);
        const categoriesDb = await this.prisma.equipmentCategory.findMany({
            select: { name: true },
        });
        const categories = categoriesDb.map((c) => c.name);
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            categories,
        };
    }
    async findOne(id) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { id },
        });
        if (!equipment) {
            throw new common_1.BadRequestException('Không tìm thấy thiết bị');
        }
        return equipment;
    }
    async create(dto) {
        await this.validateCategory(dto.category);
        const existing = await this.prisma.equipment.findUnique({
            where: { code: dto.code },
        });
        if (existing) {
            throw new common_1.ConflictException('Mã thiết bị đã tồn tại');
        }
        return this.prisma.equipment.create({
            data: {
                ...dto,
                availableQuantity: dto.quantity,
                status: dto.status || client_1.EquipmentStatus.AVAILABLE,
            },
        });
    }
    async update(id, dto) {
        const equipment = await this.findOne(id);
        if (dto.category) {
            await this.validateCategory(dto.category);
        }
        if (dto.code && dto.code !== equipment.code) {
            const existing = await this.prisma.equipment.findUnique({
                where: { code: dto.code },
            });
            if (existing) {
                throw new common_1.ConflictException('Mã thiết bị đã tồn tại');
            }
        }
        const data = { ...dto };
        if (dto.quantity !== undefined) {
            const diff = dto.quantity - equipment.quantity;
            const newAvailable = equipment.availableQuantity + diff;
            if (newAvailable < 0) {
                throw new common_1.BadRequestException('Số lượng mới không thể nhỏ hơn số lượng đang cho mượn');
            }
            data.availableQuantity = newAvailable;
        }
        return this.prisma.equipment.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const equipment = await this.findOne(id);
        if (equipment.availableQuantity < equipment.quantity) {
            throw new common_1.BadRequestException('Không thể xóa thiết bị đang được cho mượn');
        }
        return this.prisma.equipment.delete({
            where: { id },
        });
    }
};
exports.EquipmentService = EquipmentService;
exports.EquipmentService = EquipmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EquipmentService);
//# sourceMappingURL=equipment.service.js.map