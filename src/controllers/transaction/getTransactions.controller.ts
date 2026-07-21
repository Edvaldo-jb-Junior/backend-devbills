import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsQuery } from "../../schemas/transavtion.schema";
import { TransactionFilter } from "../../types/transaction.type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import prisma from "../../config/prisma";

dayjs.extend(utc);


export const getTransactions = async(
    request: FastifyRequest<{Querystring: GetTransactionsQuery}>,
    reply: FastifyReply
): Promise<void> => {
    const userId = "FDCGFC";
    if(!userId) {
        return reply.status(401).send({ error: "Usuário não autenticado" });
    }

    const { month, year, type, categoryId } = request.query;

    const filters: TransactionFilter = { userId };

    if(month && year) {
        const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
        const endDate = dayjs.utc(startDate).endOf("month").toDate();
        filters.date = { gte: startDate, lte: endDate };
    }

    if(type){
        filters.type = type;
    }

    if(categoryId){
        filters.categoryId = categoryId;
    }

    try {
        const transaction = await prisma.transaction.findMany({
            where: filters,
            orderBy: { date: "desc"},
            include: { category: {
                select: {
                    color: true,
                    name: true,
                    type: true,
                },
            }},
        });

        reply.send(transaction)
    } catch (error) {
        request.log.error(error,"error ao trazer transações");
        reply.status(500).send({ error: "error do servidor" });
    }
};