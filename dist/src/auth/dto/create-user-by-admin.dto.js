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
exports.CreateUserByAdminDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateUserByAdminDto {
    name;
    email;
    password;
    role;
    phone;
}
exports.CreateUserByAdminDto = CreateUserByAdminDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ tên không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Họ tên phải là chuỗi ký tự' }),
    __metadata("design:type", String)
], CreateUserByAdminDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không đúng định dạng' }),
    __metadata("design:type", String)
], CreateUserByAdminDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.MinLength)(6, { message: 'Mật khẩu phải dài ít nhất 6 ký tự' }),
    __metadata("design:type", String)
], CreateUserByAdminDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Vai trò không được để trống' }),
    (0, class_validator_1.IsEnum)(client_1.Role, { message: 'Vai trò không hợp lệ' }),
    __metadata("design:type", String)
], CreateUserByAdminDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Số điện thoại phải là chuỗi ký tự' }),
    __metadata("design:type", String)
], CreateUserByAdminDto.prototype, "phone", void 0);
//# sourceMappingURL=create-user-by-admin.dto.js.map