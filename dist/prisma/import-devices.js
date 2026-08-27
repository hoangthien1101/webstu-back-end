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
const xlsx = __importStar(require("xlsx"));
const cloudinary_1 = require("cloudinary");
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🚀 Starting device import from Excel...');
    const filePath = 'G:\\2.CODE\\thiết bị2.xlsx';
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Excel file not found at: ${filePath}`);
        process.exit(1);
    }
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(`📊 Found ${data.length} records in Excel file.`);
    const categoriesInExcel = new Set();
    for (const row of data) {
        const categoryName = String(row['Tên DM'] || '').trim();
        if (categoryName) {
            categoriesInExcel.add(categoryName);
        }
    }
    console.log('📁 Seeding categories...');
    for (const catName of categoriesInExcel) {
        const existing = await prisma.equipmentCategory.findUnique({
            where: { name: catName },
        });
        if (!existing) {
            await prisma.equipmentCategory.create({
                data: { name: catName },
            });
            console.log(`   + Created category: "${catName}"`);
        }
        else {
            console.log(`   ~ Category already exists: "${catName}"`);
        }
    }
    let createdCount = 0;
    let updatedCount = 0;
    let failedCount = 0;
    const defaultPlaceholder = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60';
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rawCode = row['Mã Thiết bị'];
        const rawName = row['Tên thiết bị'];
        if (!rawCode || !rawName) {
            console.warn(`⚠️ Warning: Skipping row ${i + 2} because Code or Name is missing.`);
            failedCount++;
            continue;
        }
        const code = String(rawCode).trim();
        const name = String(rawName).trim();
        const category = String(row['Tên DM'] || '').trim();
        const description = String(row['Mô Tả'] || '').trim();
        const quantity = parseInt(row['Số lượng'], 10) || 1;
        let status = client_1.EquipmentStatus.AVAILABLE;
        const rawStatus = String(row['Tình trạng'] || '').trim().toLowerCase();
        if (rawStatus.includes('bảo trì')) {
            status = client_1.EquipmentStatus.MAINTENANCE;
        }
        else if (rawStatus.includes('mượn')) {
            status = client_1.EquipmentStatus.BORROWED;
        }
        let imageUrl = defaultPlaceholder;
        const rawImgLink = row['Link ảnh'];
        if (rawImgLink) {
            const cleanPath = String(rawImgLink).replace(/^"|"$/g, '').trim();
            if (fs.existsSync(cleanPath)) {
                try {
                    console.log(`[${i + 1}/${data.length}] Uploading image for "${name}" from: ${cleanPath}`);
                    const uploadRes = await cloudinary_1.v2.uploader.upload(cleanPath, {
                        folder: 'equipment',
                    });
                    imageUrl = uploadRes.secure_url;
                    console.log(`   Image uploaded successfully: ${imageUrl}`);
                }
                catch (uploadError) {
                    console.warn(`   ⚠️ Upload failed for image path "${cleanPath}":`, uploadError);
                    console.log(`   Using default placeholder image instead.`);
                }
            }
            else {
                console.warn(`   ⚠️ File does not exist at local path: "${cleanPath}". Using default placeholder.`);
            }
        }
        try {
            const existingDevice = await prisma.equipment.findUnique({
                where: { code },
            });
            await prisma.equipment.upsert({
                where: { code },
                update: {
                    name,
                    category,
                    description,
                    image: imageUrl,
                    quantity,
                    availableQuantity: quantity,
                    status,
                },
                create: {
                    code,
                    name,
                    category,
                    description,
                    image: imageUrl,
                    quantity,
                    availableQuantity: quantity,
                    status,
                },
            });
            if (existingDevice) {
                console.log(`   ✓ Updated device: [${code}] - ${name}`);
                updatedCount++;
            }
            else {
                console.log(`   ✓ Created device: [${code}] - ${name}`);
                createdCount++;
            }
        }
        catch (dbError) {
            console.error(`   ❌ DB Error saving device [${code}]:`, dbError);
            failedCount++;
        }
    }
    console.log('\n====================================');
    console.log('🎉 Device Import Complete!');
    console.log(`   - Created: ${createdCount}`);
    console.log(`   - Updated: ${updatedCount}`);
    console.log(`   - Failed/Skipped: ${failedCount}`);
    console.log('====================================');
}
main()
    .catch((e) => {
    console.error('❌ Critical error during execution:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=import-devices.js.map