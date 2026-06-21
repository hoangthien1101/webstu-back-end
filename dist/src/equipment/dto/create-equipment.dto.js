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
exports.CreateEquipmentDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class CreateEquipmentDto {
    code;
    name;
    category;
    description;
    image;
    quantity;
    status;
}
exports.CreateEquipmentDto = CreateEquipmentDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mã thiết bị không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mã thiết bị phải là chuỗi' }),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên thiết bị không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Tên thiết bị phải là chuỗi' }),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Danh mục không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Danh mục phải là chuỗi' }),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả thiết bị không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mô tả thiết bị phải là chuỗi' }),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Hình ảnh không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Hình ảnh phải là chuỗi' }),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số lượng không được để trống' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Số lượng phải là số nguyên' }),
    (0, class_validator_1.Min)(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' }),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.EquipmentStatus, { message: 'Trạng thái không hợp lệ' }),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "status", void 0);
//# sourceMappingURL=create-equipment.dto.js.map