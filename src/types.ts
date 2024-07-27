
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
  category: string;
  amount: number;
  createdAt: string;
}