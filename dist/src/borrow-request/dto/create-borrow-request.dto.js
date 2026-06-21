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
exports.CreateBorrowRequestDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BorrowedEquipmentDto {
    equipmentId;
    quantity;
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mã thiết bị không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BorrowedEquipmentDto.prototype, "equipmentId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số lượng không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'Số lượng phải là số nguyên' }),
    (0, class_validator_1.Min)(1, { message: 'Số lượng tối thiểu là 1' }),
    __metadata("design:type", Number)
], BorrowedEquipmentDto.prototype, "quantity", void 0);
class CreateBorrowRequestDto {
    equipments;
    purpose;
    borrowDate;
    returnDate;
}
exports.CreateBorrowRequestDto = CreateBorrowRequestDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Danh sách thiết bị không được để trống' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BorrowedEquipmentDto),
    __metadata("design:type", Array)
], CreateBorrowRequestDto.prototype, "equipments", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mục đích mượn không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mục đích mượn phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Mục đích mượn không được vượt quá 500 ký tự' }),
    __metadata("design:type", String)
], CreateBorrowRequestDto.prototype, "purpose", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày giờ mượn không được để trống' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateBorrowRequestDto.prototype, "borrowDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày giờ trả không được để trống' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateBorrowRequestDto.prototype, "returnDate", void 0);
//# sourceMappingURL=create-borrow-request.dto.js.map