import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, Transaction} from '../types';
import {
  addTransaction,
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
  fetchTransaction
} from './financeThunks';

export interface FinanceState {
  categories: Category[];
  fetchCategoryLoading: boolean;
  transactions: Transaction[],
  editCategoryLoading: boolean;
  deleteLoading: boolean,
  showCategoryModal: boolean
  createLoading: boolean;
  currentCategory: Category | null;
  showTransactionModal: boolean;
  selectedCategories: Category[];
  createTransactionLoad: boolean;
  fetchTransactionLoading: boolean;
}

export const initialState: FinanceState = {
  categories: [],
  transactions: [],
  currentCategory: null,
  editCategoryLoading: false,
  fetchCategoryLoading: false,
  deleteLoading: false,
  showCategoryModal: false,
  createLoading: false,
  showTransactionModal: false,
  selectedCategories: [],
  createTransactionLoad: false,
  fetchTransactionLoading: false,
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    showCategoriesModal: (state) => {
      state.showCategoryModal = true;
    },

    closeCategoriesModal: (state) => {
      state.showCategoryModal = false;
      state.currentCategory = null;
    },

    addTransactionModal: (state) => {
      state.showTransactionModal = true;
    },

    closeTransactionModal: (state) => {
      state.showTransactionModal = false;
      // state.currentCategory = null;
    },

    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },

    getCurrentCategory: (state, {payload: category}: PayloadAction<Category>) => {
      state.currentCategory = category;
    },

    getSelectedCategories: (state, {payload: type}: PayloadAction<string>) => {
      state.selectedCategories = state.categories.filter((category) => category.type === type);
    },

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

    builder.addCase(addTransaction.pending, (state) => {
      state.createTransactionLoad = true;
    }).addCase(addTransaction.fulfilled, (state) => {
      state.createTransactionLoad = false;
    }).addCase(addTransaction.rejected, (state) => {
      state.createTransactionLoad = false;
    });

    builder.addCase(fetchTransaction.pending, (state) => {
      state.fetchTransactionLoading = true;
    }).addCase(fetchTransaction.fulfilled, (state, {payload: transactions}) => {
      state.fetchTransactionLoading = false;
      state.transactions = transactions;
    }).addCase(fetchTransaction.rejected, (state) => {
      state.fetchTransactionLoading = false;
    });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectShowCategoriesModal: (state) => state.showCategoryModal,
    selectCreateLoading: (state) => state.createLoading,
    selectCurrentCategory: (state) => state.currentCategory,
    selectFetchCategoryLoading: (state) => state.fetchCategoryLoading,
    selectEditCategoryLoading: (state) => state.editCategoryLoading,
    selectDeleteLoading: (state) => state.deleteLoading,
    selectShowModal: (state) => state.showTransactionModal,
    selectSelectedCategories: (state) => state.selectedCategories,
    selectCreateTransaction: (state) => state.createTransactionLoad,
    selectTransactions: (state) => state.transactions,
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
  selectShowModal,
  selectSelectedCategories,
  selectCreateTransaction,
  selectTransactions,
} = financeSlice.selectors;

export const {
  showCategoriesModal,
  closeCategoriesModal,
  clearCurrentCategory,
  getCurrentCategory,
  addTransactionModal,
  closeTransactionModal,
  getSelectedCategories,
} = financeSlice.actions;