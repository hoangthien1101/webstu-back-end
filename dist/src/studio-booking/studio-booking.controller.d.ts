import { StudioBookingService } from './studio-booking.service';
import { CreateStudioBookingDto } from './dto/create-studio-booking.dto';
export declare class StudioBookingController {
    private readonly studioBookingService;
    constructor(studioBookingService: StudioBookingService);
    create(req: any, dto: CreateStudioBookingDto): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        fullName: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        rejectReason: string | null;
        userId: string;
        participants: number;
        technicalSupport: boolean;
        startTime: Date;
        endTime: Date;
    }>;
    findAll(req: any, mine?: string, calendar?: string): Promise<({
        user: {
            id: string;
            email: string;
            employeeCode: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        updatedAt: Date;
        createdAt: Date;
        id: string;
        fullName: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        rejectReason: string | null;
        userId: string;
        participants: number;
        technicalSupport: boolean;
        startTime: Date;
        endTime: Date;
    })[]>;
    approve(id: string, body: {
        force?: boolean;
    }): Promise<{
        status: string;
        message: string;
        overlapsCount: number;
        data?: undefined;
    } | {
        status: string;
        data: {
            updatedAt: Date;
            createdAt: Date;
            id: string;
            fullName: string;
            status: import("@prisma/client").$Enums.RequestStatus;
            purpose: string;
            rejectReason: string | null;
            userId: string;
            participants: number;
            technicalSupport: boolean;
            startTime: Date;
            endTime: Date;
        };
        message?: undefined;
        overlapsCount?: undefined;
    }>;
    reject(id: string, body: {
        rejectReason: string;
    }): Promise<{
        updatedAt: Date;
        createdAt: Date;
        id: string;
        fullName: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        purpose: string;
        rejectReason: string | null;
        userId: string;
        participants: number;
        technicalSupport: boolean;
        startTime: Date;
        endTime: Date;
    }>;
}
