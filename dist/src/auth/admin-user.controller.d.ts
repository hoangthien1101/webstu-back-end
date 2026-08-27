import { AuthService } from './auth.service';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
export declare class AdminUserController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(dto: CreateUserByAdminDto): Promise<{
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
