import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        isActive: boolean;
        verificationToken: string | null;
        tokenExpiresAt: Date | null;
    }>;
    login(loginDto: LoginDto): Promise<{
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
    getProfile(req: any): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        isActive: boolean;
        verificationToken: string | null;
        tokenExpiresAt: Date | null;
    }>;
    updateProfile(req: any, dto: {
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
        isActive: boolean;
        verificationToken: string | null;
        tokenExpiresAt: Date | null;
    }>;
    uploadAvatar(req: any, file: Express.Multer.File): Promise<{
        avatarUrl: string | null;
    }>;
    verify(body: {
        email: string;
        otp: string;
    }): Promise<{
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
            isActive: boolean;
            verificationToken: string | null;
            tokenExpiresAt: Date | null;
        };
    }>;
    resendOtp(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
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
}
