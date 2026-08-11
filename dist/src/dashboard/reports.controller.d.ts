import * as express from 'express';
import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    exportExcel(res: express.Response, range?: string, startDate?: string, endDate?: string, month?: string, year?: string): Promise<void>;
}
