import  { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transaction/createTransaction.controller";
import { getTransactions } from "../controllers/transaction/getTransactions.controller";
import { getTransactionsSummarySchema } from "../schemas/transavtion.schema";
import { getTransactionsSummary } from "../controllers/transaction/getTransactionsSummary.controller";
import { z } from "zod";


const transactionRoutes = async (fastify: FastifyInstance) => {
    // criação
    fastify.route({
        method: "POST",
        url: "/",
        handler: createTransaction,

    });
    //busca com filtros
    fastify.route({
        method: "GET",
        url: "/",
        handler: getTransactions,
    });

    // busca de resumo
    fastify.route({
        method: "GET",
        url: "/summary",
        schema: {
            querystring: z.toJSONSchema(getTransactionsSummarySchema),
        },
        handler: getTransactionsSummary
    });
}

export default transactionRoutes;