declare class BorrowedEquipmentDto {
    equipmentId: string;
    quantity: number;
}
export declare class CreateBorrowRequestDto {
    equipments: BorrowedEquipmentDto[];
    purpose: string;
    borrowDate: Date;
    returnDate: Date;
}
export {};
