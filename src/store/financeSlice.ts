import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, Transaction} from '../types';
import {createCategory, deleteCategory, editCategory, fetchCategories} from './financeThunks';


export interface FinanceState {
  categories: Category[];
  fetchCategoryLoading: boolean;
  transaction: Transaction[],
  editCategoryLoading: boolean;
  deleteLoading: boolean,
  showModal: boolean
  createLoading: boolean;
  currentCategory: Category | null;
}

export const initialState: FinanceState = {
  categories: [],
  transaction: [],
  currentCategory: null,
  editCategoryLoading: false,
  fetchCategoryLoading: false,
  deleteLoading: false,
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
      state.currentCategory = null;
    },

    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },

    getCurrentCategory: (state, {payload: category}: PayloadAction<Category>) => {
      state.currentCategory = category;
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

    builder.addCase(editCategory.pending, (state) => {
      state.editCategoryLoading = true;
    }).addCase(editCategory.fulfilled, (state) => {
      state.editCategoryLoading = false;
    }).addCase(editCategory.rejected, (state) => {
      state.editCategoryLoading = false;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.deleteLoading = true;
    }).addCase(deleteCategory.fulfilled, (state) => {
      state.deleteLoading = false;
    }).addCase(deleteCategory.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectShowCategoriesModal: (state) => state.showModal,
    selectCreateLoading: (state) => state.createLoading,
    selectCurrentCategory: (state) => state.currentCategory,
    selectFetchCategoryLoading: (state) => state.fetchCategoryLoading,
    selectEditCategoryLoading: (state) => state.editCategoryLoading,
    selectDeleteLoading: (state) => state.deleteLoading,
  },
});

export const financeReducer = financeSlice.reducer;

export const {
  selectShowCategoriesModal,
  selectCreateLoading,
  selectFetchCategoryLoading,
  selectCategories,
  selectCurrentCategory,
  selectEditCategoryLoading,
  selectDeleteLoading,
} = financeSlice.selectors;

export const {
  showCategoriesModal,
  closeCategoriesModal,
  clearCurrentCategory,
  getCurrentCategory,
} = financeSlice.actions;