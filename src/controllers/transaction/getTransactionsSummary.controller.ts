import type { FastifyReply, FastifyRequest } from "fastify";
import type { getTransactionsSummaryQuery } from "../../schemas/transavtion.schema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import prisma from "../../config/prisma";
import { CategorySummary } from "../../types/category,types";
import { TransactionType } from "../../../generated/prisma";
import { array } from "zod";
import { TransactionSumary } from "../../types/transaction.type";

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
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            include: { 
                category: true,
            },
        });

        let totalExpenses = 0;
        let totalIncome = 0;
        const groupedExpenses = new Map<string, CategorySummary>();

        for (const transaction of transactions) {

            if ( transaction.type === TransactionType.EXPENSE) {

                const existing = groupedExpenses.get(transaction.categoryId) ?? {
                    categoryId: transaction.categoryId,
                    categoryName: transaction.category.name,
                    categoryColor: transaction.category.color,
                    amount: 0,
                    percentage: 0,
                }

                existing.amount += transaction.amount
                groupedExpenses.set(transaction.categoryId, existing)

                totalExpenses += transaction.amount;
        } else {
            totalIncome += transaction.amount;
        }
        
    }
        const summary: TransactionSumary = {
            totalExpenses,
            totalIncome,
            balance: Number((totalIncome - totalExpenses).toFixed(2)),
            expensesByCategory: Array.from(groupedExpenses.values()).map((entry)=> ({
                ...entry,
                percentge: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2))
            })).sort((a,b) => b.amount - a.amount)
        }
        reply.send(summary)
    } catch (error) {
        request.log.error(error,"error ao trazer transações");
        reply.status(500).send({ error: "error do servidor" });
    }
};
