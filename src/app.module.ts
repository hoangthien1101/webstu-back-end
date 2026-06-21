import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EquipmentModule } from './equipment/equipment.module';
import { BorrowRequestModule } from './borrow-request/borrow-request.module';
import { StudioBookingModule } from './studio-booking/studio-booking.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './equipment/category/category.module';
import { HomepageContentModule } from './homepage-content/homepage-content.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CloudinaryModule,
    EquipmentModule,
    BorrowRequestModule,
    StudioBookingModule,
    DashboardModule,
    CategoryModule,
    HomepageContentModule,
  ],
})
export class AppModule {}
