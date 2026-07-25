import  { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transaction/createTransaction.controller";
import { getTransactions } from "../controllers/transaction/getTransactions.controller";
import { deleteTransactionSchema, getTransactionsSchema, getTransactionsSummarySchema } from "../schemas/transavtion.schema";
import { getTransactionsSummary } from "../controllers/transaction/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/transaction/deleteTrasanctions.controller";


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
        schema: {
            querystring: getTransactionsSchema,
        },
        handler: getTransactions,
    });

    // busca de resumo
    fastify.route({
        method: "GET",
        url: "/summary",
        schema: {
            querystring: getTransactionsSummarySchema,
        },
        handler: getTransactionsSummary
    });

    //delete
    fastify.route({
        method: "DELETE",
        url: "/:id",
        schema: {
            params: deleteTransactionSchema,
        },
        handler: deleteTransaction
    })
}

export default transactionRoutes;