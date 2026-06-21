import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
type PrismaWithRawCommands = Pick<PrismaClient, '$runCommandRaw'>;
export declare function isPrismaDateConversionError(error: unknown): error is Prisma.PrismaClientKnownRequestError;
export declare function repairHomepageContentDateFields(prisma: PrismaService | PrismaClient | PrismaWithRawCommands, referenceDate?: Date): Promise<number>;
export {};
