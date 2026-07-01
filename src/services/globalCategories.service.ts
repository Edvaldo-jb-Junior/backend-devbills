import { type Category, TransactionType } from "../../generated/prisma";

type GlobalCategoryInput = Pick<Category, "name" | "color" | "type"> & {}

const globalCategories: GlobalCategoryInput[] = [
  // Despesas
  { name: "Alimentação", color: "#FF5733", type: TransactionType.EXPENSE },
  { name: "Transporte", color: "#33A8FF", type: TransactionType.EXPENSE },
  { name: "Moradia", color: "#33FF57", type: TransactionType.EXPENSE },
  { name: "Saúde", color: "#F033FF", type: TransactionType.EXPENSE },
  { name: "Educação", color: "#FF3366", type: TransactionType.EXPENSE },
  { name: "Lazer", color: "#FFBA33", type: TransactionType.EXPENSE },
  { name: "Compras", color: "#33FFF6", type: TransactionType.EXPENSE },
  { name: "Outros", color: "#B033FF", type: TransactionType.EXPENSE },

  // Receitas
  { name: "Salário", color: "#33FF57", type: TransactionType.INCOME },
  { name: "Freelance", color: "#33A8FF", type: TransactionType.INCOME },
  { name: "Investimentos", color: "#FFBA33", type: TransactionType.INCOME },
  { name: "Outros", color: "#B033FF", type: TransactionType.INCOME },
];


export const initializeGlobalCategories = async(): Promise<Category[]> => {
    const createCategories: Category[] = [];

    return createCategories;
}