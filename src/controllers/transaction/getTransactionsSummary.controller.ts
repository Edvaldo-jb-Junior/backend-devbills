import type { FastifyReply, FastifyRequest } from "fastify";
import type { getTransactionsSummaryQuery } from "../../schemas/transavtion.schema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import prisma from "../../config/prisma";

dayjs.extend(utc);




export const getTransactionsSummary = async (
    request: FastifyRequest<{ Querystring: getTransactionsSummaryQuery }>,
    reply: FastifyReply
): Promise<void> => {

    const userId = "FDCGFC"

    if(!userId) {
       return reply.status(401).send({ error: "Usuário nao autenticado" });
    }

    const { month, year } = request.query;

    if(!month || !year) {
        reply.status(400).send({ error: "Mês e ano são obrigatórios" });
        return;
    }

    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();

     try {
        const transaction = await prisma.transaction.findMany({
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            include: { 
                category: true,
            },
        });

        reply.send(transaction)
    } catch (error) {
        request.log.error(error,"error ao trazer transações");
        reply.status(500).send({ error: "error do servidor" });
    }
};