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
    }>;
    uploadAvatar(req: any, file: Express.Multer.File): Promise<{
        avatarUrl: string | null;
    }>;
}
