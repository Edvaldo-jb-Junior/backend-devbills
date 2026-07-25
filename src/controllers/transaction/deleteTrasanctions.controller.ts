import { FastifyReply, FastifyRequest } from "fastify";
import { deleteTransactionParams } from "../../schemas/transavtion.schema";
import prisma from "../../config/prisma";


export const deleteTransaction = async(
    request: FastifyRequest<{Params: deleteTransactionParams}>, 
    reply: FastifyReply):Promise<void> =>{
        const userId = "FDCGFC"
        const {id} = request.params

    if(!userId) {
       return reply.status(401).send({ error: "Usuário nao autenticado" });
    }

    try {
        
        const transaction = await prisma.transaction.findFirst({
            where: {
                id, 
                userId
            },
        });

        if(!transaction){
            reply.status(400).send({error: "Id sa trasação inválido"});
            return;
        }

        await prisma.transaction.delete({ where: { id }});

        reply.status(200).send({message: "Transação deletada com sucesso"});
    } catch (error) {
        request.log.error({message: "Error ao deletar transação"}),
        reply.status(500).send({error: "Error interno do servidor, falha ao deletar transação"})
    }

    };