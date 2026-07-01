import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transaction/createTransaction.controller";


const transactionRoutes = async (fastify: FastifyInstance) => {

    fastify.route({
        method: "POST",
        url: "/",
        schema: {
            
        },
        handler: createTransaction,

    })
}

export default transactionRoutes;