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
exports.StudioBookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let StudioBookingService = class StudioBookingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const start = new Date(dto.startTime);
        const end = new Date(dto.endTime);
        if (start >= end) {
            throw new common_1.BadRequestException('Thời gian kết thúc phải sau thời gian bắt đầu');
        }
        if (start < new Date()) {
            throw new common_1.BadRequestException('Không thể đặt phòng cho thời gian trong quá khứ');
        }
        const overlappingApproved = await this.prisma.studioBooking.findFirst({
            where: {
                status: client_1.RequestStatus.APPROVED,
                startTime: { lt: end },
                endTime: { gt: start },
            },
        });
        if (overlappingApproved) {
            throw new common_1.ConflictException('Khung giờ này đã được phê duyệt cho người dùng khác. Vui lòng chọn khung giờ khác!');
        }
        return this.prisma.studioBooking.create({
            data: {
                userId,
                fullName: dto.fullName,
                participants: dto.participants,
                purpose: dto.purpose,
                technicalSupport: dto.technicalSupport,
                startTime: start,
                endTime: end,
                status: client_1.RequestStatus.PENDING,
            },
        });
    }
    async findAll(query) {
        const where = {};
        if (query.calendar) {
            if (query.role === 'ADMIN') {
                where.status = { in: [client_1.RequestStatus.APPROVED, client_1.RequestStatus.PENDING] };
            }
            else {
                where.OR = [
                    { status: client_1.RequestStatus.APPROVED },
                    {
                        userId: query.userId,
                        status: client_1.RequestStatus.PENDING,
                    },
                ];
            }
        }
        else {
            if (query.mine && query.userId) {
                where.userId = query.userId;
            }
            else if (query.role !== 'ADMIN') {
                where.userId = query.userId;
            }
        }
        return this.prisma.studioBooking.findMany({
            where,
            orderBy: { startTime: 'asc' },
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
    }
    async findOne(id) {
        const booking = await this.prisma.studioBooking.findUnique({
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
        if (!booking) {
            throw new common_1.BadRequestException('Không tìm thấy lịch đặt phòng');
        }
        return booking;
    }
    async approve(id, body) {
        const booking = await this.findOne(id);
        if (booking.status !== client_1.RequestStatus.PENDING) {
            throw new common_1.BadRequestException('Lịch đặt phải ở trạng thái CHỜ DUYỆT mới có thể phê duyệt');
        }
        const overlappingPending = await this.prisma.studioBooking.findMany({
            where: {
                id: { not: id },
                status: client_1.RequestStatus.PENDING,
                startTime: { lt: booking.endTime },
                endTime: { gt: booking.startTime },
            },
        });
        if (overlappingPending.length > 0 && !body.force) {
            return {
                status: 'warning',
                message: `Có ${overlappingPending.length} yêu cầu khác đang chờ duyệt trong cùng khung giờ. Nếu tiếp tục duyệt, các yêu cầu đó sẽ tự động bị từ chối.`,
                overlapsCount: overlappingPending.length,
            };
        }
        const approved = await this.prisma.studioBooking.update({
            where: { id },
            data: { status: client_1.RequestStatus.APPROVED },
        });
        if (overlappingPending.length > 0) {
            await this.prisma.studioBooking.updateMany({
                where: {
                    id: { in: overlappingPending.map((b) => b.id) },
                },
                data: {
                    status: client_1.RequestStatus.REJECTED,
                    rejectReason: 'Khung giờ này đã được phê duyệt cho người dùng khác.',
                },
            });
        }
        return {
            status: 'success',
            data: approved,
        };
    }
    async reject(id, body) {
        const booking = await this.findOne(id);
        if (booking.status !== client_1.RequestStatus.PENDING) {
            throw new common_1.BadRequestException('Lịch đặt phải ở trạng thái CHỜ DUYỆT mới có thể từ chối');
        }
        if (!body.rejectReason || body.rejectReason.trim() === '') {
            throw new common_1.BadRequestException('Lý do từ chối không được để trống');
        }
        if (body.rejectReason.length > 500) {
            throw new common_1.BadRequestException('Lý do từ chối không được vượt quá 500 ký tự');
        }
        return this.prisma.studioBooking.update({
            where: { id },
            data: {
                status: client_1.RequestStatus.REJECTED,
                rejectReason: body.rejectReason.trim(),
            },
        });
    }
};
exports.StudioBookingService = StudioBookingService;
exports.StudioBookingService = StudioBookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudioBookingService);
//# sourceMappingURL=studio-booking.service.js.map