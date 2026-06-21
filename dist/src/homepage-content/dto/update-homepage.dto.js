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
exports.UpdateHomepageDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateHomepageDto {
    heroTitle;
    heroDescription;
    heroVideoUrl;
    heroPosterUrl;
    aboutContent;
    contactInfo;
}
exports.UpdateHomepageDto = UpdateHomepageDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tiêu đề Hero không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHomepageDto.prototype, "heroTitle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả Hero không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHomepageDto.prototype, "heroDescription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'URL Video Hero không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHomepageDto.prototype, "heroVideoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHomepageDto.prototype, "heroPosterUrl", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nội dung giới thiệu không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHomepageDto.prototype, "aboutContent", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Thông tin liên hệ không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHomepageDto.prototype, "contactInfo", void 0);
//# sourceMappingURL=update-homepage.dto.js.map