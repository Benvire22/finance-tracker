
export interface Category {
  id: string;
  type: string;
  name: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories {
  [key: string]: ApiCategory;
}


export interface Transaction {
  id: string
  category: string;
  amount: number;
  createdAt: string;
  type: string;
  categoryId: string;
}

export interface TransactionMutation {
  category: string;
  amount: string;
  type: string;
}

export interface ApiTransaction {
  category: string;
  amount: number;
  createdAt: string;
}

export interface ApiTransactions {
  [key: string]: ApiTransaction;
}