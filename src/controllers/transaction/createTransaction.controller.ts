import type { FastifyReply, FastifyRequest } from "fastify";



const createTransaction = async(request: FastifyRequest, reply: FastifyReply): 
    Promise<void> => {

    const userId = "FDCGFC"

    if(!userId) {
        reply.status(401).send({ error: "Usuário nao autenticado" });
    }
}

export default createTransaction;