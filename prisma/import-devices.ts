import { PrismaClient, EquipmentStatus } from '@prisma/client';
import * as xlsx from 'xlsx';
import { v2 as cloudinary } from 'cloudinary';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting device import from Excel...');

  const filePath = 'G:\\2.CODE\\thiết bị2.xlsx';
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Excel file not found at: ${filePath}`);
    process.exit(1);
  }

  // Read workbook
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json<any>(worksheet);

  console.log(`📊 Found ${data.length} records in Excel file.`);

  // 1. Collect and Seed Categories
  const categoriesInExcel = new Set<string>();
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
    } else {
      console.log(`   ~ Category already exists: "${catName}"`);
    }
  }

  // 2. Loop and upsert devices
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

    // Map Tình trạng -> status
    let status: EquipmentStatus = EquipmentStatus.AVAILABLE;
    const rawStatus = String(row['Tình trạng'] || '').trim().toLowerCase();
    if (rawStatus.includes('bảo trì')) {
      status = EquipmentStatus.MAINTENANCE;
    } else if (rawStatus.includes('mượn')) {
      status = EquipmentStatus.BORROWED;
    }

    // Process image path and upload
    let imageUrl = defaultPlaceholder;
    const rawImgLink = row['Link ảnh'];
    if (rawImgLink) {
      // Clean up string: Excel paths might have double quotes in the parsed cell values
      const cleanPath = String(rawImgLink).replace(/^"|"$/g, '').trim();

      if (fs.existsSync(cleanPath)) {
        try {
          console.log(`[${i + 1}/${data.length}] Uploading image for "${name}" from: ${cleanPath}`);
          const uploadRes = await cloudinary.uploader.upload(cleanPath, {
            folder: 'equipment',
          });
          imageUrl = uploadRes.secure_url;
          console.log(`   Image uploaded successfully: ${imageUrl}`);
        } catch (uploadError) {
          console.warn(`   ⚠️ Upload failed for image path "${cleanPath}":`, uploadError);
          console.log(`   Using default placeholder image instead.`);
        }
      } else {
        console.warn(`   ⚠️ File does not exist at local path: "${cleanPath}". Using default placeholder.`);
      }
    }

    try {
      // Check if it already exists to log correct stats
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
          availableQuantity: quantity, // sync availableQuantity during seeding
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
      } else {
        console.log(`   ✓ Created device: [${code}] - ${name}`);
        createdCount++;
      }
    } catch (dbError) {
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
