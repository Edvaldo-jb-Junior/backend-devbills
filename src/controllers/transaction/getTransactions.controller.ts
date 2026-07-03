import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsQuery } from "../../schemas/transavtion.schema";
import { TransactionFilter } from "../../types/transaction.type";


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

    }
}