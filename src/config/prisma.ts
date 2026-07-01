import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const prismaConnect = async () => {

    try {
        await prisma.$connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
}

export default prisma;