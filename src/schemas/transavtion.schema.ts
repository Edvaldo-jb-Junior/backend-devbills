import { z } from "zod";
import { ObjectId } from "mongodb";
import { TransactionType } from "../../generated/prisma";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransaction = z.object({
    decription: z.string().min(1, { message: "Descrição é obrigatória" }),
    amount: z.number().positive("valor deve ser positivo"),
    date: z.coerce.date({
        error: () => ({ message: "Data inválida" })
    }),
    categoryId: z.string().refine( isValidObjectId,
        { message: "ID de categoria inválido",
        }),
    type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE], {
        error: () => ({ message: "Tipo de transação inválido" })
    })
    
});