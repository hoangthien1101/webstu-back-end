import { DashboardService } from './dashboard.service';
import { Role } from '@prisma/client';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        equipment: {
            total: number;
            available: number;
            borrowed: number;
            maintenance: number;
        };
        requests: {
            pendingBorrows: number;
            pendingBookings: number;
        };
        users: {
            total: number;
        };
    }>;
    getReports(range?: string, startDate?: string, endDate?: string): Promise<{
        borrowsCount: number;
        bookingsCount: number;
        topEquipment: {
            id: string;
            count: number;
            name: string;
            code: string;
            category: string;
            image: string;
        }[];
        utilizationRate: number;
        chartData: {
            date: string;
            borrows: number;
            bookings: number;
        }[];
    }>;
    getUsers(): Promise<{
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
    }[]>;
    updateRole(req: any, id: string, newRole: Role): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    deleteUser(req: any, id: string): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        email: string;
        employeeCode: string;
        fullName: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
    }>;
}
