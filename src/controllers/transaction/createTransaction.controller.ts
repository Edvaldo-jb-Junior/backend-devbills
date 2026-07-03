import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transavtion.schema";
import prisma from "../../config/prisma";



const createTransaction = async(request: FastifyRequest, reply: FastifyReply): 
    Promise<void> => {

    const userId = "FDCGFC"

    if(!userId) {
       return reply.status(401).send({ error: "Usuário nao autenticado" });
    }

    const result = createTransactionSchema.safeParse(request.body);

    if(!result.success){
        const errorMensage = result.error.message || "validação inválida";

        return reply.status(400).send({error: errorMensage});
    }

    const transaction = result.data;

    try {
        const category = await prisma.category.findFirst({
            where: {
                id: transaction.categoryId,
                type: transaction.type,
            }
        });

        if(!category) {
            return reply.status(400).send({ error: "Categoria inválida" });
        }

        const parseData = new Date(transaction.date);

        const newTransaction = await prisma.transaction.create({
            data: {
                ...transaction,
                userId,
                date: parseData,
            },
            include: {
                category: true,
            },
        });

        reply.status(201).send(newTransaction);
    } catch (error) {
        request.log.error(error, "erro ao criar transação");
        reply.status(500).send({ error: "Erro interno do servidor" });
    }
}

export default createTransaction;