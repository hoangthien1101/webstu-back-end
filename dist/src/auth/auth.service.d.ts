import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private cloudinaryService;
    private mailService;
    constructor(prisma: PrismaService, jwtService: JwtService, cloudinaryService: CloudinaryService, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        phone: string | null;
        isActive: boolean;
        verificationToken: string | null;
        tokenExpiresAt: Date | null;
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
        phone: string | null;
        isActive: boolean;
        verificationToken: string | null;
        tokenExpiresAt: Date | null;
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
        phone: string | null;
        isActive: boolean;
        verificationToken: string | null;
        tokenExpiresAt: Date | null;
    }>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        avatarUrl: string | null;
    }>;
    verify(email: string, otp: string): Promise<{
        accessToken: string;
        user: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            email: string;
            employeeCode: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            phone: string | null;
            isActive: boolean;
            verificationToken: string | null;
            tokenExpiresAt: Date | null;
        };
    }>;
    resendOtp(email: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(dto: {
        email: string;
        otp: string;
        newPassword: string;
    }): Promise<{
        message: string;
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
    createUserByAdmin(dto: CreateUserByAdminDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        phone: string | null;
        isActive: boolean;
        verificationToken: string | null;
        tokenExpiresAt: Date | null;
    }>;
}
