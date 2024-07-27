import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiCategory, Category} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createCategory = createAsyncThunk<void, ApiCategory, {state: RootState}>(
  'financeThunks/createCategory',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  },
);

export const fetchCategories = createAsyncThunk<Category[], void, {state: RootState}>(
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

export const editCategory = createAsyncThunk<void, EditCategoryArg, {state: RootState}>(
  'finance/editCategory',
  async ({id, category}) => {
    await axiosApi.put(`/categories/${id}.json`, category);
  }
);

export const deleteCategory = createAsyncThunk<void, string, {state: RootState}>(
  'finance/deleteCategory',
  async (id) => {
    await axiosApi.delete(`/categories/${id}.json`);
  },
);