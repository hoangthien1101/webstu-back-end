"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const express = __importStar(require("express"));
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
const ExcelJS = __importStar(require("exceljs"));
let ReportsController = class ReportsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportExcel(res, range, startDate, endDate, month, year) {
        let start = new Date();
        let end = new Date();
        if (range === 'month') {
            start = new Date(end.getFullYear(), end.getMonth(), 1);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        }
        else if (range === 'year') {
            start = new Date(end.getFullYear(), 0, 1);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        }
        else if (range === 'month-year' && month && year) {
            const m = Number(month) - 1;
            const y = Number(year);
            start = new Date(y, m, 1);
            start.setHours(0, 0, 0, 0);
            end = new Date(y, m + 1, 0);
            end.setHours(23, 59, 59, 999);
        }
        else if (range === 'custom' && startDate && endDate) {
            start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
        }
        else {
            start = new Date(end.getFullYear(), end.getMonth(), 1);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        }
        const borrows = await this.prisma.borrowRequest.findMany({
            where: {
                status: { in: [client_1.RequestStatus.APPROVED, client_1.RequestStatus.RETURNED] },
                createdAt: { gte: start, lte: end },
            },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
        });
        const bookings = await this.prisma.studioBooking.findMany({
            where: {
                status: { in: [client_1.RequestStatus.APPROVED, client_1.RequestStatus.RETURNED] },
                startTime: { gte: start, lte: end },
            },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
        });
        const equipmentCountMap = new Map();
        const allEquipmentIds = new Set();
        borrows.forEach((b) => {
            b.equipments.forEach((eq) => {
                allEquipmentIds.add(eq.equipmentId);
                const currentCount = equipmentCountMap.get(eq.equipmentId) || 0;
                equipmentCountMap.set(eq.equipmentId, currentCount + (eq.quantity || 1));
            });
        });
        const equipmentDetails = await this.prisma.equipment.findMany({
            where: { id: { in: Array.from(allEquipmentIds) } },
            select: { id: true, name: true, code: true, category: true },
        });
        const equipmentMap = new Map(equipmentDetails.map((eq) => [eq.id, eq]));
        const formatDate = (d) => {
            const pad = (n) => n.toString().padStart(2, '0');
            return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
        };
        const workbook = new ExcelJS.Workbook();
        const applySheetStyles = (worksheet, headerColorHex, alignLeftCols = []) => {
            const headerRow = worksheet.getRow(1);
            headerRow.height = 32;
            headerRow.eachCell((cell) => {
                cell.font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FFFFFF' } };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: headerColorHex },
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                cell.border = {
                    top: { style: 'thin', color: { argb: '000000' } },
                    left: { style: 'thin', color: { argb: '000000' } },
                    bottom: { style: 'medium', color: { argb: '000000' } },
                    right: { style: 'thin', color: { argb: '000000' } },
                };
            });
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1)
                    return;
                row.height = 25;
                row.eachCell((cell) => {
                    cell.font = { name: 'Arial', size: 10 };
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'D1D5DB' } },
                        left: { style: 'thin', color: { argb: 'D1D5DB' } },
                        bottom: { style: 'thin', color: { argb: 'D1D5DB' } },
                        right: { style: 'thin', color: { argb: 'D1D5DB' } },
                    };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                alignLeftCols.forEach((colIdx) => {
                    const cell = row.getCell(colIdx);
                    if (cell)
                        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
                });
                const statusColIdx = worksheet.columns.length - 1;
                const statusCell = row.getCell(statusColIdx);
                if (statusCell && statusCell.value) {
                    if (statusCell.value.toString().includes('Đã duyệt')) {
                        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
                        statusCell.font = { name: 'Arial', size: 10, bold: true, color: { argb: '15803D' } };
                    }
                    else if (statusCell.value.toString().includes('Đã trả')) {
                        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E0E7FF' } };
                        statusCell.font = { name: 'Arial', size: 10, bold: true, color: { argb: '4338CA' } };
                    }
                }
            });
        };
        const sheetDevice = workbook.addWorksheet('Mượn Thiết Bị');
        sheetDevice.columns = [
            { header: 'STT', key: 'stt', width: 6 },
            { header: 'Họ và Tên Người Mượn', key: 'fullName', width: 25 },
            { header: 'Mã NV / SV', key: 'employeeCode', width: 15 },
            { header: 'Danh Sách Thiết Bị Mượn', key: 'items', width: 45 },
            { header: 'Thời Gian Bắt Đầu Mượn', key: 'startTimeStr', width: 22 },
            { header: 'Thời Gian Trả / Kết Thúc', key: 'endTimeStr', width: 22 },
            { header: 'Mục Đích Sử Dụng', key: 'purpose', width: 32 },
            { header: 'Trạng Thái Đơn', key: 'status', width: 16 },
            { header: 'Ngày Tạo Đơn', key: 'createdDateStr', width: 22 },
        ];
        borrows.forEach((b, idx) => {
            const eqList = b.equipments
                .map((eq) => {
                const detail = equipmentMap.get(eq.equipmentId);
                return `${detail?.name || 'Không xác định'} (${detail?.code || eq.equipmentId}) x${eq.quantity}`;
            })
                .join(', ');
            sheetDevice.addRow({
                stt: idx + 1,
                fullName: b.user?.fullName || 'N/A',
                employeeCode: b.user?.employeeCode || 'N/A',
                items: eqList,
                startTimeStr: formatDate(b.borrowDate),
                endTimeStr: formatDate(b.returnDate),
                purpose: b.purpose,
                status: b.status === client_1.RequestStatus.APPROVED ? 'Đã duyệt' : 'Đã trả',
                createdDateStr: formatDate(b.createdAt),
            });
        });
        applySheetStyles(sheetDevice, '1F2937', [2, 4, 7]);
        const sheetStudio = workbook.addWorksheet('Đặt Phòng Studio');
        sheetStudio.columns = [
            { header: 'STT', key: 'stt', width: 6 },
            { header: 'Họ và Tên Người Đặt', key: 'fullName', width: 25 },
            { header: 'Mã NV / SV', key: 'employeeCode', width: 15 },
            { header: 'Thời Gian Bắt Đầu Mượn', key: 'startTimeStr', width: 22 },
            { header: 'Thời Gian Trả / Kết Thúc', key: 'endTimeStr', width: 22 },
            { header: 'Số Lượng Tham Gia', key: 'participants', width: 18 },
            { header: 'Hỗ Trợ Kỹ Thuật', key: 'technicalSupport', width: 18 },
            { header: 'Mục Đích Sử Dụng', key: 'purpose', width: 32 },
            { header: 'Trạng Thái Đơn', key: 'status', width: 16 },
            { header: 'Ngày Tạo Đơn', key: 'createdDateStr', width: 22 },
        ];
        bookings.forEach((bk, idx) => {
            sheetStudio.addRow({
                stt: idx + 1,
                fullName: bk.fullName || bk.user?.fullName || 'N/A',
                employeeCode: bk.user?.employeeCode || 'N/A',
                startTimeStr: formatDate(bk.startTime),
                endTimeStr: formatDate(bk.endTime),
                participants: bk.participants,
                technicalSupport: bk.technicalSupport ? 'Có' : 'Không',
                purpose: bk.purpose,
                status: bk.status === client_1.RequestStatus.APPROVED ? 'Đã duyệt' : 'Đã trả',
                createdDateStr: formatDate(bk.createdAt),
            });
        });
        applySheetStyles(sheetStudio, '0F172A', [2, 8]);
        const sheetTopEquipment = workbook.addWorksheet('Thiết Bị Mượn Nhiều Nhất');
        sheetTopEquipment.columns = [
            { header: 'STT (Xếp Hạng)', key: 'rank', width: 15 },
            { header: 'Mã Thiết Bị', key: 'code', width: 20 },
            { header: 'Tên Thiết Bị', key: 'name', width: 35 },
            { header: 'Danh Mục / Loại', key: 'category', width: 25 },
            { header: 'Tổng Số Lượt / Số Lượng Mượn', key: 'totalBorrowed', width: 30 },
        ];
        const topEquipments = Array.from(equipmentCountMap.entries())
            .map(([eqId, count]) => {
            const detail = equipmentMap.get(eqId);
            return {
                code: detail?.code || eqId,
                name: detail?.name || 'Chưa xác định',
                category: detail?.category || 'N/A',
                totalBorrowed: count,
            };
        })
            .sort((a, b) => b.totalBorrowed - a.totalBorrowed);
        topEquipments.forEach((item, idx) => {
            sheetTopEquipment.addRow({
                rank: idx + 1,
                code: item.code,
                name: item.name,
                category: item.category,
                totalBorrowed: item.totalBorrowed,
            });
        });
        applySheetStyles(sheetTopEquipment, '065F46', [3]);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="bao-cao-tong-hop-${Date.now()}.xlsx"`);
        await workbook.xlsx.write(res);
        res.end();
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('export-excel'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('range')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('month')),
    __param(5, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportExcel", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map