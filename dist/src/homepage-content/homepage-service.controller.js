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
exports.HomepageServiceController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const homepage_service_service_1 = require("./homepage-service.service");
const create_homepage_service_dto_1 = require("./dto/create-homepage-service.dto");
const update_homepage_service_dto_1 = require("./dto/update-homepage-service.dto");
const reorder_items_dto_1 = require("./dto/reorder-items.dto");
const homepage_defaults_1 = require("./homepage.defaults");
let HomepageServiceController = class HomepageServiceController {
    homepageServiceService;
    constructor(homepageServiceService) {
        this.homepageServiceService = homepageServiceService;
    }
    findAll(activeOnly) {
        return this.homepageServiceService.findAll(activeOnly === 'true');
    }
    getIcons() {
        return homepage_defaults_1.HOMEPAGE_SERVICE_ICONS;
    }
    findOne(id) {
        return this.homepageServiceService.findOne(id);
    }
    create(dto) {
        return this.homepageServiceService.create(dto);
    }
    reorder(dto) {
        return this.homepageServiceService.reorder(dto);
    }
    update(id, dto) {
        return this.homepageServiceService.update(id, dto);
    }
    remove(id) {
        return this.homepageServiceService.remove(id);
    }
};
exports.HomepageServiceController = HomepageServiceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomepageServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('icons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomepageServiceController.prototype, "getIcons", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomepageServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_homepage_service_dto_1.CreateHomepageServiceDto]),
    __metadata("design:returntype", void 0)
], HomepageServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reorder_items_dto_1.ReorderItemsDto]),
    __metadata("design:returntype", void 0)
], HomepageServiceController.prototype, "reorder", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_homepage_service_dto_1.UpdateHomepageServiceDto]),
    __metadata("design:returntype", void 0)
], HomepageServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomepageServiceController.prototype, "remove", null);
exports.HomepageServiceController = HomepageServiceController = __decorate([
    (0, common_1.Controller)('homepage-services'),
    __metadata("design:paramtypes", [homepage_service_service_1.HomepageServiceService])
], HomepageServiceController);
//# sourceMappingURL=homepage-service.controller.js.map