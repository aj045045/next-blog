// import { PrismaClient } from "@prisma/client";
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// const prisma = globalForPrisma.prisma || new PrismaClient({ transactionOptions: { maxWait: 5000, timeout: 5000 }, log: ['warn', 'error'] });
// export default prisma;
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["warn", "error"],
        transactionOptions: {
            maxWait: 5000,
            timeout: 5000,
        },
    });

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;
