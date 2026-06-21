"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageContentModule = void 0;
const common_1 = require("@nestjs/common");
const homepage_content_service_1 = require("./homepage-content.service");
const homepage_content_controller_1 = require("./homepage-content.controller");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const homepage_bootstrap_service_1 = require("./homepage-bootstrap.service");
const homepage_service_service_1 = require("./homepage-service.service");
const homepage_gallery_service_1 = require("./homepage-gallery.service");
const homepage_section_service_1 = require("./homepage-section.service");
const homepage_aggregate_service_1 = require("./homepage-aggregate.service");
const homepage_controller_1 = require("./homepage.controller");
const homepage_service_controller_1 = require("./homepage-service.controller");
const homepage_gallery_controller_1 = require("./homepage-gallery.controller");
const homepage_section_controller_1 = require("./homepage-section.controller");
let HomepageContentModule = class HomepageContentModule {
};
exports.HomepageContentModule = HomepageContentModule;
exports.HomepageContentModule = HomepageContentModule = __decorate([
    (0, common_1.Module)({
        imports: [cloudinary_module_1.CloudinaryModule],
        controllers: [
            homepage_controller_1.HomepageController,
            homepage_content_controller_1.HomepageContentController,
            homepage_service_controller_1.HomepageServiceController,
            homepage_gallery_controller_1.HomepageGalleryController,
            homepage_section_controller_1.HomepageSectionController,
        ],
        providers: [
            homepage_content_service_1.HomepageContentService,
            homepage_bootstrap_service_1.HomepageBootstrapService,
            homepage_service_service_1.HomepageServiceService,
            homepage_gallery_service_1.HomepageGalleryService,
            homepage_section_service_1.HomepageSectionService,
            homepage_aggregate_service_1.HomepageAggregateService,
        ],
        exports: [
            homepage_content_service_1.HomepageContentService,
            homepage_service_service_1.HomepageServiceService,
            homepage_gallery_service_1.HomepageGalleryService,
            homepage_section_service_1.HomepageSectionService,
            homepage_aggregate_service_1.HomepageAggregateService,
        ],
    })
], HomepageContentModule);
//# sourceMappingURL=homepage-content.module.js.map