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
exports.HomepageContentController = void 0;
const common_1 = require("@nestjs/common");
const homepage_content_service_1 = require("./homepage-content.service");
const update_homepage_dto_1 = require("./dto/update-homepage.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let HomepageContentController = class HomepageContentController {
    homepageContentService;
    cloudinaryService;
    constructor(homepageContentService, cloudinaryService) {
        this.homepageContentService = homepageContentService;
        this.cloudinaryService = cloudinaryService;
    }
    getContent() {
        return this.homepageContentService.getContent();
    }
    updateContent(dto) {
        return this.homepageContentService.updateContent(dto);
    }
    async uploadVideo(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn tệp video');
        }
        const allowedExtensions = ['.mp4', '.webm'];
        const filename = file.originalname.toLowerCase();
        const hasAllowedExtension = allowedExtensions.some((ext) => filename.endsWith(ext));
        const allowedMimeTypes = ['video/mp4', 'video/webm'];
        const hasAllowedMime = allowedMimeTypes.includes(file.mimetype);
        if (!hasAllowedExtension || !hasAllowedMime) {
            throw new common_1.BadRequestException('Chỉ chấp nhận tệp video định dạng MP4 hoặc WebM');
        }
        const maxSizeBytes = 50 * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            throw new common_1.BadRequestException('Tệp video vượt quá dung lượng tối đa cho phép (50MB)');
        }
        const result = await this.cloudinaryService.uploadFile(file, {
            resource_type: 'video',
        });
        return {
            url: result.secure_url,
        };
    }
    async uploadPoster(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn tệp hình ảnh làm ảnh chờ (Poster)');
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
        return {
            url: result.secure_url,
        };
    }
};
exports.HomepageContentController = HomepageContentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomepageContentController.prototype, "getContent", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_homepage_dto_1.UpdateHomepageDto]),
    __metadata("design:returntype", void 0)
], HomepageContentController.prototype, "updateContent", null);
__decorate([
    (0, common_1.Post)('video'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomepageContentController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Post)('poster'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomepageContentController.prototype, "uploadPoster", null);
exports.HomepageContentController = HomepageContentController = __decorate([
    (0, common_1.Controller)('homepage-content'),
    __metadata("design:paramtypes", [homepage_content_service_1.HomepageContentService,
        cloudinary_service_1.CloudinaryService])
], HomepageContentController);
//# sourceMappingURL=homepage-content.controller.js.map