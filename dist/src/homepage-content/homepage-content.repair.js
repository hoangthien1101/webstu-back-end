"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrismaDateConversionError = isPrismaDateConversionError;
exports.repairHomepageContentDateFields = repairHomepageContentDateFields;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const HOMEPAGE_CONTENT_COLLECTION = 'HomepageContent';
const logger = new common_1.Logger('HomepageContentRepair');
function toMongoDate(date) {
    return { $date: date.toISOString() };
}
function isPrismaDateConversionError(error) {
    return (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2032');
}
async function repairHomepageContentDateFields(prisma, referenceDate = new Date()) {
    const mongoDate = toMongoDate(referenceDate);
    let repairedCount = 0;
    const repairOperations = [
        {
            label: 'updatedAt',
            query: {
                $or: [{ updatedAt: null }, { updatedAt: { $exists: false } }],
            },
            fields: { updatedAt: mongoDate },
        },
        {
            label: 'createdAt',
            query: {
                $or: [{ createdAt: null }, { createdAt: { $exists: false } }],
            },
            fields: { createdAt: mongoDate },
        },
    ];
    for (const operation of repairOperations) {
        try {
            const result = (await prisma.$runCommandRaw({
                update: HOMEPAGE_CONTENT_COLLECTION,
                updates: [
                    {
                        q: operation.query,
                        u: { $set: operation.fields },
                        multi: true,
                    },
                ],
            }));
            const modified = result.nModified ?? result.n ?? 0;
            repairedCount += modified;
            if (modified > 0) {
                logger.warn(`Repaired ${modified} HomepageContent record(s): set missing/null ${operation.label}`);
            }
        }
        catch (error) {
            logger.error(`Failed to repair HomepageContent ${operation.label} fields`, error instanceof Error ? error.stack : String(error));
            throw error;
        }
    }
    if (repairedCount > 0) {
        logger.log(`HomepageContent date-field repair completed (${repairedCount} field update(s))`);
    }
    return repairedCount;
}
//# sourceMappingURL=homepage-content.repair.js.map