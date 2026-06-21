"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const homepage_content_defaults_1 = require("../src/homepage-content/homepage-content.defaults");
const homepage_defaults_1 = require("../src/homepage-content/homepage.defaults");
const homepage_content_repair_1 = require("../src/homepage-content/homepage-content.repair");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    await (0, homepage_content_repair_1.repairHomepageContentDateFields)(prisma);
    const adminEmail = 'admin@studio.com';
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Admin@123456', 10);
        const admin = await prisma.user.create({
            data: {
                fullName: 'Studio Administrator',
                email: adminEmail,
                password: hashedPassword,
                employeeCode: 'ADMIN001',
                role: client_1.Role.ADMIN,
            },
        });
        console.log('Admin account created:', admin.email);
    }
    else {
        console.log('Admin account already exists:', existingAdmin.email);
    }
    const defaultCategories = ['Máy ảnh', 'Micro', 'Đèn', 'Tripod', 'Lens'];
    for (const catName of defaultCategories) {
        const existingCat = await prisma.equipmentCategory.findUnique({
            where: { name: catName },
        });
        if (!existingCat) {
            await prisma.equipmentCategory.create({
                data: { name: catName },
            });
            console.log(`Category seeded: ${catName}`);
        }
    }
    const homepageCount = await prisma.homepageContent.count();
    if (homepageCount === 0) {
        await prisma.homepageContent.create({
            data: homepage_content_defaults_1.DEFAULT_HOMEPAGE_CONTENT,
        });
        console.log('Default HomepageContent seeded.');
    }
    const serviceCount = await prisma.homepageService.count();
    if (serviceCount === 0) {
        await prisma.homepageService.createMany({ data: homepage_defaults_1.DEFAULT_HOMEPAGE_SERVICES });
        console.log('Default HomepageService items seeded.');
    }
    const galleryCount = await prisma.homepageGallery.count();
    if (galleryCount === 0) {
        await prisma.homepageGallery.createMany({ data: homepage_defaults_1.DEFAULT_HOMEPAGE_GALLERY });
        console.log('Default HomepageGallery items seeded.');
    }
    const sectionCount = await prisma.homepageSection.count();
    if (sectionCount === 0) {
        await prisma.homepageSection.create({ data: homepage_defaults_1.DEFAULT_HOMEPAGE_SECTION });
        console.log('Default HomepageSection seeded.');
    }
    const equipmentCount = await prisma.equipment.count();
    if (equipmentCount === 0) {
        const sampleEquipments = [
            {
                code: 'CAM-SONY-A7S3',
                name: 'Máy ảnh Sony Alpha A7S III',
                category: 'Máy ảnh',
                description: 'Máy ảnh quay phim chuyên nghiệp 4K 120fps lý tưởng cho Studio.',
                image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
                quantity: 5,
                availableQuantity: 5,
                status: client_1.EquipmentStatus.AVAILABLE,
            },
            {
                code: 'LENS-SONY-2470GM',
                name: 'Ống kính Sony FE 24-70mm f/2.8 GM II',
                category: 'Lens',
                description: 'Ống kính zoom tiêu chuẩn khẩu độ lớn f/2.8 chất lượng tối cao.',
                image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=60',
                quantity: 3,
                availableQuantity: 3,
                status: client_1.EquipmentStatus.AVAILABLE,
            },
            {
                code: 'MIC-RODE-WIRELESS',
                name: 'Microphone Rode Wireless PRO',
                category: 'Micro',
                description: 'Bộ microphone thu âm không dây 2 kênh chuyên nghiệp thu âm podcast và quay video.',
                image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=60',
                quantity: 10,
                availableQuantity: 10,
                status: client_1.EquipmentStatus.AVAILABLE,
            },
            {
                code: 'LIGHT-APUTURE-600D',
                name: 'Đèn Studio Aputure LS 600d Pro',
                category: 'Đèn',
                description: 'Đèn LED COB nguồn điểm ánh sáng ban ngày siêu sáng cho Studio.',
                image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60',
                quantity: 2,
                availableQuantity: 2,
                status: client_1.EquipmentStatus.AVAILABLE,
            },
        ];
        for (const eq of sampleEquipments) {
            await prisma.equipment.create({ data: eq });
        }
        console.log('Sample equipments seeded.');
    }
    console.log('Seeding finished successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map