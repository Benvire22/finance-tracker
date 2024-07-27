import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiCategory, ApiTransaction, Category, Transaction,} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createCategory = createAsyncThunk<void, ApiCategory, { state: RootState }>(
  'financeThunks/createCategory',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  },
);

export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
  'finance/fetchCategories',
  async () => {
    const {data: categoriesApi} = await axiosApi.get<ApiCategories>('/categories.json');
    if (categoriesApi === null) {
      return [];
    }

    return Object.keys(categoriesApi).map(id => ({
      id,
      ...categoriesApi[id],
    }));
  },
);


export interface EditCategoryArg {
  id: string;
  category: ApiCategory;
}

export const editCategory = createAsyncThunk<void, EditCategoryArg, { state: RootState }>(
  'finance/editCategory',
  async ({id, category}) => {
    await axiosApi.put(`/categories/${id}.json`, category);
  }
);

export const deleteCategory = createAsyncThunk<void, string, { state: RootState }>(
  'finance/deleteCategory',
  async (id) => {
    await axiosApi.delete(`/categories/${id}.json`);
  },
);

export const addTransaction = createAsyncThunk<void, ApiTransaction, { state: RootState }>(
  'finance/addTransaction',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  },
);

export const fetchTransaction = createAsyncThunk<Transaction[], void, { state: RootState }>(
  'finance/fetchTransaction',
  async (_, thunkAPI) => {
    const {data: apiTransactions} = await axiosApi.get('/transactions.json');

    if (apiTransactions === null) {
      return [];
    }

    const categories = thunkAPI.getState().finance.categories;


    const array: Transaction[] = [];
    Object.keys(apiTransactions).map(id => {
      const transaction = apiTransactions[id];
      console.log(transaction);
      for (const category of categories) {
        if (category.id === transaction.category) {
          array.push({
             id,
             ...transaction,
             category: category.name,
             type: category.type,
             categoryId: category.id,
           });
          console.log(1);
        }
      }
    });
    console.log('array', array);
    return array;
  },
);