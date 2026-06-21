import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private cloudinaryService;
    constructor(prisma: PrismaService, jwtService: JwtService, cloudinaryService: CloudinaryService);
    register(dto: RegisterDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
            employeeCode: string;
            avatarUrl: string | null;
        };
    }>;
    getProfile(userId: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
    }>;
    updateProfile(userId: string, dto: {
        fullName: string;
        employeeCode: string;
    }): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
    }>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        avatarUrl: string | null;
    }>;
}
