import {createSlice} from '@reduxjs/toolkit';
import {Category, Transaction} from '../types';
import {createCategory, fetchCategories} from './financeThunks';


export interface FinanceState {
  categories: Category[];
  fetchCategoryLoading: boolean;
  transaction: Transaction[],
  showModal: boolean
  createLoading: boolean;
  currentCategory: Category | null;
}

export const initialState: FinanceState = {
  categories: [],
  transaction: [],
  currentCategory: null,
  fetchCategoryLoading: false,
  showModal: false,
  createLoading: false
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    showCategoriesModal: (state) => {
      state.showModal = true;
    },

    closeCategoriesModal: (state) => {
      state.showModal = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
    }).addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createCategory.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchCategoryLoading = true;
    }).addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.fetchCategoryLoading = false;
      state.categories = categories;
    }).addCase(fetchCategories.rejected, (state) => {
      state.fetchCategoryLoading = false;
    });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectShowCategoriesModal: (state) => state.showModal,
    selectCreateLoading: (state) => state.createLoading,
    selectCurrentCategory: (state) => state.currentCategory,
    selectFetchCategoryLoading: (state) => state.fetchCategoryLoading,
  },
});

export const financeReducer = financeSlice.reducer;

export const {
  selectShowCategoriesModal,
  selectCreateLoading,
  selectFetchCategoryLoading,
  selectCategories,
  selectCurrentCategory,
} = financeSlice.selectors;

export const {
  showCategoriesModal,
  closeCategoriesModal,
} = financeSlice.actions;