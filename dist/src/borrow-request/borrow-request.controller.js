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
exports.BorrowRequestController = void 0;
const common_1 = require("@nestjs/common");
const borrow_request_service_1 = require("./borrow-request.service");
const create_borrow_request_dto_1 = require("./dto/create-borrow-request.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
let BorrowRequestController = class BorrowRequestController {
    borrowRequestService;
    constructor(borrowRequestService) {
        this.borrowRequestService = borrowRequestService;
    }
    create(req, dto) {
        return this.borrowRequestService.create(req.user.id, dto);
    }
    findAll(req) {
        return this.borrowRequestService.findAll(req.user.role, req.user.id);
    }
    async findOne(req, id) {
        const request = await this.borrowRequestService.findOne(id);
        if (req.user.role !== client_1.Role.ADMIN && request.userId !== req.user.id) {
            throw new common_1.ForbiddenException('Bạn không có quyền xem yêu cầu này');
        }
        return request;
    }
    approve(id) {
        return this.borrowRequestService.approve(id);
    }
    reject(id, body) {
        return this.borrowRequestService.reject(id, body);
    }
    return(id) {
        return this.borrowRequestService.return(id);
    }
};
exports.BorrowRequestController = BorrowRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_borrow_request_dto_1.CreateBorrowRequestDto]),
    __metadata("design:returntype", void 0)
], BorrowRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BorrowRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BorrowRequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/approve'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BorrowRequestController.prototype, "approve", null);
__decorate([
    (0, common_1.Put)(':id/reject'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BorrowRequestController.prototype, "reject", null);
__decorate([
    (0, common_1.Put)(':id/return'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BorrowRequestController.prototype, "return", null);
exports.BorrowRequestController = BorrowRequestController = __decorate([
    (0, common_1.Controller)('borrow-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [borrow_request_service_1.BorrowRequestService])
], BorrowRequestController);
//# sourceMappingURL=borrow-request.controller.js.map