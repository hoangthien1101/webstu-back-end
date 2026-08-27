import { Role } from '@prisma/client';
export declare class CreateUserByAdminDto {
    name: string;
    email: string;
    password: string;
    role: Role;
    phone?: string;
}
