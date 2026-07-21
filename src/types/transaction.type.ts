import { TransactionType } from "../../generated/prisma";
import { CategorySummary } from "./category,types";


export interface TransactionFilter {
    userId: string;
    date?:{
        gte: Date;
        lte: Date;
    };
    type?: TransactionType;
    categoryId?: string;
}


export interface TransactionSumary {
    totalExpenses: number;
    totalIncome: number;
    balance: number;
    expensesByCategory: CategorySummary[];
}

