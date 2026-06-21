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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const [totalEquipmentAgg, availableEquipmentAgg, maintenanceEquipmentAgg, pendingBorrows, pendingBookings, totalUsers,] = await Promise.all([
            this.prisma.equipment.aggregate({ _sum: { quantity: true } }),
            this.prisma.equipment.aggregate({ _sum: { availableQuantity: true } }),
            this.prisma.equipment.aggregate({
                _sum: { quantity: true },
                where: { status: client_1.EquipmentStatus.MAINTENANCE },
            }),
            this.prisma.borrowRequest.count({ where: { status: client_1.RequestStatus.PENDING } }),
            this.prisma.studioBooking.count({ where: { status: client_1.RequestStatus.PENDING } }),
            this.prisma.user.count(),
        ]);
        const total = totalEquipmentAgg._sum.quantity || 0;
        const available = availableEquipmentAgg._sum.availableQuantity || 0;
        const maintenance = maintenanceEquipmentAgg._sum.quantity || 0;
        const borrowed = Math.max(0, total - available - maintenance);
        return {
            equipment: {
                total,
                available,
                borrowed,
                maintenance,
            },
            requests: {
                pendingBorrows,
                pendingBookings,
            },
            users: {
                total: totalUsers,
            },
        };
    }
    async getReports(query) {
        let start = new Date();
        const end = new Date();
        const range = query.range || 'month';
        if (range === 'week') {
            start.setDate(end.getDate() - 7);
            start.setHours(0, 0, 0, 0);
        }
        else if (range === 'month') {
            start.setDate(end.getDate() - 30);
            start.setHours(0, 0, 0, 0);
        }
        else if (range === 'year') {
            start.setFullYear(end.getFullYear(), 0, 1);
            start.setHours(0, 0, 0, 0);
        }
        else if (range === 'custom' && query.startDate && query.endDate) {
            start = new Date(query.startDate);
            start.setHours(0, 0, 0, 0);
            end.setTime(new Date(query.endDate).getTime());
            end.setHours(23, 59, 59, 999);
        }
        else {
            start.setDate(end.getDate() - 30);
            start.setHours(0, 0, 0, 0);
        }
        const borrows = await this.prisma.borrowRequest.findMany({
            where: {
                status: client_1.RequestStatus.APPROVED,
                createdAt: { gte: start, lte: end },
            },
        });
        const bookings = await this.prisma.studioBooking.findMany({
            where: {
                status: client_1.RequestStatus.APPROVED,
                startTime: { gte: start, lte: end },
            },
        });
        const chartDataMap = {};
        const tempDate = new Date(start);
        while (tempDate <= end) {
            const label = `${tempDate.getDate()}/${tempDate.getMonth() + 1}`;
            chartDataMap[label] = { date: label, borrows: 0, bookings: 0 };
            tempDate.setDate(tempDate.getDate() + 1);
        }
        borrows.forEach((b) => {
            const dateLabel = `${b.createdAt.getDate()}/${b.createdAt.getMonth() + 1}`;
            if (chartDataMap[dateLabel]) {
                chartDataMap[dateLabel].borrows += 1;
            }
        });
        bookings.forEach((b) => {
            const dateLabel = `${b.startTime.getDate()}/${b.startTime.getMonth() + 1}`;
            if (chartDataMap[dateLabel]) {
                chartDataMap[dateLabel].bookings += 1;
            }
        });
        const chartData = Object.values(chartDataMap);
        const equipmentUsageMap = {};
        borrows.forEach((b) => {
            b.equipments.forEach((eq) => {
                equipmentUsageMap[eq.equipmentId] = (equipmentUsageMap[eq.equipmentId] || 0) + eq.quantity;
            });
        });
        const sortedUsage = Object.entries(equipmentUsageMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        const topEquipment = await Promise.all(sortedUsage.map(async ([eqId, count]) => {
            const details = await this.prisma.equipment.findUnique({
                where: { id: eqId },
                select: { name: true, code: true, category: true, image: true },
            });
            return {
                id: eqId,
                count,
                name: details?.name || 'Không xác định',
                code: details?.code || 'N/A',
                category: details?.category || 'N/A',
                image: details?.image || '',
            };
        }));
        const diffMs = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        const totalOperatingHours = diffDays * 10;
        let occupiedHours = 0;
        bookings.forEach((b) => {
            const durationMs = new Date(b.endTime).getTime() - new Date(b.startTime).getTime();
            occupiedHours += durationMs / (1000 * 60 * 60);
        });
        const utilizationRate = Math.min(100, Math.round((occupiedHours / totalOperatingHours) * 100));
        return {
            borrowsCount: borrows.length,
            bookingsCount: bookings.length,
            topEquipment,
            utilizationRate,
            chartData,
        };
    }
    async getUsers() {
        return this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                fullName: true,
                email: true,
                employeeCode: true,
                role: true,
                avatarUrl: true,
                createdAt: true,
            },
        });
    }
    async updateRole(adminId, targetUserId, newRole) {
        if (adminId === targetUserId) {
            throw new common_1.BadRequestException('Bạn không thể tự thay đổi quyền hạn của chính mình');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: targetUserId },
        });
        if (!user) {
            throw new common_1.BadRequestException('Không tìm thấy người dùng');
        }
        return this.prisma.user.update({
            where: { id: targetUserId },
            data: { role: newRole },
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
            },
        });
    }
    async deleteUser(adminId, targetUserId) {
        if (adminId === targetUserId) {
            throw new common_1.BadRequestException('Bạn không thể tự xóa tài khoản của chính mình');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: targetUserId },
        });
        if (!user) {
            throw new common_1.BadRequestException('Không tìm thấy người dùng');
        }
        const activeBorrows = await this.prisma.borrowRequest.count({
            where: {
                userId: targetUserId,
                status: { in: [client_1.RequestStatus.PENDING, client_1.RequestStatus.APPROVED] },
            },
        });
        const activeBookings = await this.prisma.studioBooking.count({
            where: {
                userId: targetUserId,
                status: { in: [client_1.RequestStatus.PENDING, client_1.RequestStatus.APPROVED] },
            },
        });
        if (activeBorrows > 0 || activeBookings > 0) {
            throw new common_1.BadRequestException('Không thể xóa người dùng này do họ đang có yêu cầu mượn thiết bị hoặc đặt phòng chưa hoàn thành');
        }
        return this.prisma.user.delete({
            where: { id: targetUserId },
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map