import { PrismaService } from '../prisma/prisma.service';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';
export declare class BorrowRequestService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateBorrowRequestDto): Promise<{
        user: {
            id: string;
            email: string;
            employeeCode: string;
            fullName: string;
        };
    } & {
        updatedAt: Date;
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        borrowDate: Date;
        returnDate: Date;
        rejectReason: string | null;
        userId: string;
        equipments: {
            equipmentId: string;
            quantity: number;
        }[];
    }>;
    findAll(role: string, userId: string): Promise<{
        equipments: {
            details: {
                id: string;
                name: string;
                code: string;
                category: string;
                image: string;
            } | null;
            equipmentId: string;
            quantity: number;
        }[];
        user: {
            id: string;
            email: string;
            employeeCode: string;
            fullName: string;
            avatarUrl: string | null;
        };
        updatedAt: Date;
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        borrowDate: Date;
        returnDate: Date;
        rejectReason: string | null;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        equipments: {
            details: {
                updatedAt: Date;
                createdAt: Date;
                id: string;
                name: string;
                code: string;
                category: string;
                description: string;
                image: string;
                quantity: number;
                availableQuantity: number;
                status: import("@prisma/client").$Enums.EquipmentStatus;
            } | null;
            equipmentId: string;
            quantity: number;
        }[];
        user: {
            id: string;
            email: string;
            employeeCode: string;
            fullName: string;
        };
        updatedAt: Date;
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        borrowDate: Date;
        returnDate: Date;
        rejectReason: string | null;
        userId: string;
    }>;
    approve(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        borrowDate: Date;
        returnDate: Date;
        rejectReason: string | null;
        userId: string;
        equipments: {
            equipmentId: string;
            quantity: number;
        }[];
    }>;
    reject(id: string, body: {
        rejectReason: string;
    }): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        borrowDate: Date;
        returnDate: Date;
        rejectReason: string | null;
        userId: string;
        equipments: {
            equipmentId: string;
            quantity: number;
        }[];
    }>;
    return(id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        borrowDate: Date;
        returnDate: Date;
        rejectReason: string | null;
        userId: string;
        equipments: {
            equipmentId: string;
            quantity: number;
        }[];
    }>;
}
