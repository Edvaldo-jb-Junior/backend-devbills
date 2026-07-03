import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transaction/createTransaction.controller";
import { getTransactions } from "../controllers/transaction/getTransactions.controller";
import zodToJsonSchema from "zod-to-json-schema";
import { getTransactionsSchema } from "../schemas/transavtion.schema";


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
            querystring: zodToJsonSchema(getTransactionsSchema),
        },
        handler: getTransactions,
    });
}

export default transactionRoutes;