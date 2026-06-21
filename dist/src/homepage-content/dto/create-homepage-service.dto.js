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
exports.CreateHomepageServiceDto = void 0;
const class_validator_1 = require("class-validator");
const homepage_defaults_1 = require("../homepage.defaults");
class CreateHomepageServiceDto {
    title;
    description;
    icon;
    color;
    order;
    isActive;
}
exports.CreateHomepageServiceDto = CreateHomepageServiceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tiêu đề dịch vụ không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHomepageServiceDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả dịch vụ không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHomepageServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Icon không được để trống' }),
    (0, class_validator_1.IsIn)(homepage_defaults_1.HOMEPAGE_SERVICE_ICONS, { message: 'Icon không hợp lệ' }),
    __metadata("design:type", String)
], CreateHomepageServiceDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Màu sắc không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHomepageServiceDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateHomepageServiceDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHomepageServiceDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-homepage-service.dto.js.map