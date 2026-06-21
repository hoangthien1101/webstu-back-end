"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const equipment_module_1 = require("./equipment/equipment.module");
const borrow_request_module_1 = require("./borrow-request/borrow-request.module");
const studio_booking_module_1 = require("./studio-booking/studio-booking.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const category_module_1 = require("./equipment/category/category.module");
const homepage_content_module_1 = require("./homepage-content/homepage-content.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            cloudinary_module_1.CloudinaryModule,
            equipment_module_1.EquipmentModule,
            borrow_request_module_1.BorrowRequestModule,
            studio_booking_module_1.StudioBookingModule,
            dashboard_module_1.DashboardModule,
            category_module_1.CategoryModule,
            homepage_content_module_1.HomepageContentModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map