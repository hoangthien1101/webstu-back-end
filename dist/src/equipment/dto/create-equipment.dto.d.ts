import { EquipmentStatus } from '@prisma/client';
export declare class CreateEquipmentDto {
    code: string;
    name: string;
    category: string;
    description: string;
    image: string;
    quantity: number;
    status?: EquipmentStatus;
}
