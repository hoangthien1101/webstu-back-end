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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioBookingController = void 0;
const common_1 = require("@nestjs/common");
const studio_booking_service_1 = require("./studio-booking.service");
const create_studio_booking_dto_1 = require("./dto/create-studio-booking.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
let StudioBookingController = class StudioBookingController {
    studioBookingService;
    constructor(studioBookingService) {
        this.studioBookingService = studioBookingService;
    }
    create(req, dto) {
        return this.studioBookingService.create(req.user.id, dto);
    }
    findAll(req, mine, calendar) {
        const isMine = mine === 'true';
        const isCalendar = calendar === 'true';
        return this.studioBookingService.findAll({
            mine: isMine,
            userId: req.user.id,
            role: req.user.role,
            calendar: isCalendar,
        });
    }
    approve(id, body) {
        return this.studioBookingService.approve(id, body);
    }
    reject(id, body) {
        return this.studioBookingService.reject(id, body);
    }
};
exports.StudioBookingController = StudioBookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_studio_booking_dto_1.CreateStudioBookingDto]),
    __metadata("design:returntype", void 0)
], StudioBookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('mine')),
    __param(2, (0, common_1.Query)('calendar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], StudioBookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id/approve'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudioBookingController.prototype, "approve", null);
__decorate([
    (0, common_1.Put)(':id/reject'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudioBookingController.prototype, "reject", null);
exports.StudioBookingController = StudioBookingController = __decorate([
    (0, common_1.Controller)('studio-bookings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [studio_booking_service_1.StudioBookingService])
], StudioBookingController);
//# sourceMappingURL=studio-booking.controller.js.map