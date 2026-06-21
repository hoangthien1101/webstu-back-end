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
exports.BorrowRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BorrowRequestService = class BorrowRequestService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        if (new Date(dto.borrowDate) >= new Date(dto.returnDate)) {
            throw new common_1.BadRequestException('Ngày trả phải sau ngày mượn');
        }
        for (const item of dto.equipments) {
            const equipment = await this.prisma.equipment.findUnique({
                where: { id: item.equipmentId },
            });
            if (!equipment) {
                throw new common_1.BadRequestException(`Không tìm thấy thiết bị với ID: ${item.equipmentId}`);
            }
            if (equipment.status === client_1.EquipmentStatus.MAINTENANCE) {
                throw new common_1.BadRequestException(`Thiết bị ${equipment.name} đang được bảo trì`);
            }
            if (equipment.availableQuantity < item.quantity) {
                throw new common_1.BadRequestException(`Không đủ số lượng cho thiết bị ${equipment.name}. Còn lại: ${equipment.availableQuantity}, Yêu cầu: ${item.quantity}`);
            }
        }
        return this.prisma.borrowRequest.create({
            data: {
                userId,
                purpose: dto.purpose,
                borrowDate: new Date(dto.borrowDate),
                returnDate: new Date(dto.returnDate),
                status: client_1.RequestStatus.PENDING,
                equipments: dto.equipments,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        employeeCode: true,
                    },
                },
            },
        });
    }
    async findAll(role, userId) {
        const where = role === 'ADMIN' ? {} : { userId };
        const requests = await this.prisma.borrowRequest.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        employeeCode: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        const enrichedRequests = await Promise.all(requests.map(async (request) => {
            const enrichedEquipments = await Promise.all(request.equipments.map(async (eq) => {
                const equipment = await this.prisma.equipment.findUnique({
                    where: { id: eq.equipmentId },
                    select: { id: true, name: true, code: true, category: true, image: true },
                });
                return {
                    ...eq,
                    details: equipment,
                };
            }));
            return {
                ...request,
                equipments: enrichedEquipments,
            };
        }));
        return enrichedRequests;
    }
    async findOne(id) {
        const request = await this.prisma.borrowRequest.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        employeeCode: true,
                    },
                },
            },
        });
        if (!request) {
            throw new common_1.BadRequestException('Không tìm thấy yêu cầu mượn thiết bị');
        }
        const enrichedEquipments = await Promise.all(request.equipments.map(async (eq) => {
            const equipment = await this.prisma.equipment.findUnique({
                where: { id: eq.equipmentId },
            });
            return {
                ...eq,
                details: equipment,
            };
        }));
        return {
            ...request,
            equipments: enrichedEquipments,
        };
    }
    async approve(id) {
        const request = await this.findOne(id);
        if (request.status !== client_1.RequestStatus.PENDING) {
            throw new common_1.BadRequestException('Yêu cầu phải ở trạng thái CHỜ DUYỆT mới có thể phê duyệt');
        }
        for (const item of request.equipments) {
            const equipment = await this.prisma.equipment.findUnique({
                where: { id: item.equipmentId },
            });
            if (!equipment || equipment.availableQuantity < item.quantity) {
                throw new common_1.BadRequestException(`Không đủ số lượng cho thiết bị ${equipment?.name || 'không xác định'}. Chỉ còn: ${equipment?.availableQuantity || 0}`);
            }
        }
        for (const item of request.equipments) {
            const equipment = await this.prisma.equipment.findUnique({
                where: { id: item.equipmentId },
            });
            if (equipment) {
                const newAvailable = equipment.availableQuantity - item.quantity;
                const newStatus = newAvailable === 0 ? client_1.EquipmentStatus.BORROWED : equipment.status;
                await this.prisma.equipment.update({
                    where: { id: item.equipmentId },
                    data: {
                        availableQuantity: newAvailable,
                        status: newStatus,
                    },
                });
            }
        }
        return this.prisma.borrowRequest.update({
            where: { id },
            data: { status: client_1.RequestStatus.APPROVED },
        });
    }
    async reject(id, body) {
        const request = await this.findOne(id);
        if (request.status !== client_1.RequestStatus.PENDING) {
            throw new common_1.BadRequestException('Yêu cầu phải ở trạng thái CHỜ DUYỆT mới có thể từ chối');
        }
        if (!body.rejectReason || body.rejectReason.trim() === '') {
            throw new common_1.BadRequestException('Lý do từ chối không được để trống');
        }
        if (body.rejectReason.length > 500) {
            throw new common_1.BadRequestException('Lý do từ chối không được vượt quá 500 ký tự');
        }
        return this.prisma.borrowRequest.update({
            where: { id },
            data: {
                status: client_1.RequestStatus.REJECTED,
                rejectReason: body.rejectReason.trim(),
            },
        });
    }
    async return(id) {
        const request = await this.findOne(id);
        if (request.status !== client_1.RequestStatus.APPROVED) {
            throw new common_1.BadRequestException('Yêu cầu phải được PHÊ DUYỆT trước khi trả thiết bị');
        }
        for (const item of request.equipments) {
            const equipment = await this.prisma.equipment.findUnique({
                where: { id: item.equipmentId },
            });
            if (equipment) {
                const newAvailable = Math.min(equipment.quantity, equipment.availableQuantity + item.quantity);
                const newStatus = newAvailable > 0 && equipment.status === client_1.EquipmentStatus.BORROWED
                    ? client_1.EquipmentStatus.AVAILABLE
                    : equipment.status;
                await this.prisma.equipment.update({
                    where: { id: item.equipmentId },
                    data: {
                        availableQuantity: newAvailable,
                        status: newStatus,
                    },
                });
            }
        }
        return this.prisma.borrowRequest.update({
            where: { id },
            data: { status: client_1.RequestStatus.RETURNED },
        });
    }
};
exports.BorrowRequestService = BorrowRequestService;
exports.BorrowRequestService = BorrowRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BorrowRequestService);
//# sourceMappingURL=borrow-request.service.js.map