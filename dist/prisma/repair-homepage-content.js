"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const homepage_content_repair_1 = require("../src/homepage-content/homepage-content.repair");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Repairing HomepageContent date fields...');
    const repairedCount = await (0, homepage_content_repair_1.repairHomepageContentDateFields)(prisma);
    console.log(`Repair finished. ${repairedCount} field update(s) applied.`);
}
main()
    .catch((error) => {
    console.error('HomepageContent repair failed:', error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=repair-homepage-content.js.map