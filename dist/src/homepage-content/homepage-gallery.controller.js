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
exports.HomepageGalleryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const homepage_gallery_service_1 = require("./homepage-gallery.service");
const create_homepage_gallery_dto_1 = require("./dto/create-homepage-gallery.dto");
const update_homepage_gallery_dto_1 = require("./dto/update-homepage-gallery.dto");
const reorder_items_dto_1 = require("./dto/reorder-items.dto");
let HomepageGalleryController = class HomepageGalleryController {
    homepageGalleryService;
    cloudinaryService;
    constructor(homepageGalleryService, cloudinaryService) {
        this.homepageGalleryService = homepageGalleryService;
        this.cloudinaryService = cloudinaryService;
    }
    findAll(activeOnly) {
        return this.homepageGalleryService.findAll(activeOnly === 'true');
    }
    findOne(id) {
        return this.homepageGalleryService.findOne(id);
    }
    create(dto) {
        return this.homepageGalleryService.create(dto);
    }
    async uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn tệp hình ảnh');
        }
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const filename = file.originalname.toLowerCase();
        const hasAllowedExtension = allowedExtensions.some((ext) => filename.endsWith(ext));
        const isImageMime = file.mimetype.startsWith('image/');
        if (!hasAllowedExtension || !isImageMime) {
            throw new common_1.BadRequestException('Chỉ chấp nhận tệp hình ảnh định dạng JPG, JPEG, PNG hoặc WEBP');
        }
        const maxSizeBytes = 10 * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            throw new common_1.BadRequestException('Tệp ảnh vượt quá dung lượng tối đa cho phép (10MB)');
        }
        const result = await this.cloudinaryService.uploadFile(file, {
            resource_type: 'image',
        });
        return { url: result.secure_url };
    }
    reorder(dto) {
        return this.homepageGalleryService.reorder(dto);
    }
    update(id, dto) {
        return this.homepageGalleryService.update(id, dto);
    }
    remove(id) {
        return this.homepageGalleryService.remove(id);
    }
};
exports.HomepageGalleryController = HomepageGalleryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomepageGalleryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomepageGalleryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_homepage_gallery_dto_1.CreateHomepageGalleryDto]),
    __metadata("design:returntype", void 0)
], HomepageGalleryController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomepageGalleryController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Put)('reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reorder_items_dto_1.ReorderItemsDto]),
    __metadata("design:returntype", void 0)
], HomepageGalleryController.prototype, "reorder", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_homepage_gallery_dto_1.UpdateHomepageGalleryDto]),
    __metadata("design:returntype", void 0)
], HomepageGalleryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomepageGalleryController.prototype, "remove", null);
exports.HomepageGalleryController = HomepageGalleryController = __decorate([
    (0, common_1.Controller)('homepage-gallery'),
    __metadata("design:paramtypes", [homepage_gallery_service_1.HomepageGalleryService,
        cloudinary_service_1.CloudinaryService])
], HomepageGalleryController);
//# sourceMappingURL=homepage-gallery.controller.js.map