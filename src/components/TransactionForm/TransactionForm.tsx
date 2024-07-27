import MyModal from '../MyModal/MyModal';
import React, {useEffect, useState} from 'react';
import {ApiTransaction, TransactionMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  closeTransactionModal,
  getSelectedCategories, selectCreateTransaction,
  selectCurrentTransaction,
  selectSelectedCategories,
  selectShowModal
} from '../../store/financeSlice';
import {
  addTransaction,
  editTransaction,
  fetchCategories,
  fetchTransaction
} from '../../store/financeThunks';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: TransactionMutation = {
  category: '',
  amount: '',
  type: '',
};

const TransactionForm = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector(selectShowModal);
  const categories = useAppSelector(selectSelectedCategories);
  const currentTransaction = useAppSelector(selectCurrentTransaction);
  const isCreatingLoading = useAppSelector(selectCreateTransaction);

  const close = () => {
    dispatch(closeTransactionModal());
  };

  useEffect(() => {
    try {
      dispatch(fetchCategories());
      if (currentTransaction) {
        setFormData({
          category: currentTransaction.categoryId,
          amount: currentTransaction.amount.toString(),
          type: currentTransaction.type,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, currentTransaction]);

  const onSubmit = async (e: React.FormEvent) => {
   try {
     e.preventDefault();
     if (currentTransaction === null) {
       const now = new Date();
       const createdAt = now.toISOString();

       const newTransaction: ApiTransaction = {
         amount: parseInt(formData.amount),
         category: formData.category,
         createdAt,
       };

       await dispatch(addTransaction(newTransaction));
     } else {
       const newTransaction: ApiTransaction = {
         amount: parseInt(formData.amount),
         category: formData.category,
         createdAt: currentTransaction.createdAt,
       };

        await dispatch(editTransaction({
          transaction: newTransaction,
          id: currentTransaction.id
        }));
     }
     await dispatch(fetchTransaction());
     setFormData(initialState);
     close();
   } catch (e) {
     console.error(e);
   }
  };

  const changeForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});

    if (e.target.name === 'type') {
      dispatch(getSelectedCategories(e.target.value));
    }
  };

  return (
    <MyModal
      isOpen={isOpenModal}
      onClose={close}
    >
      <div className="row px-5 fs-6">
        <h3 className="text-primary-emphasis text-center fs-1 mb-5">
          {/*{currentTransaction ? 'Edit' : 'Add'}*/}
          Transition
        </h3>
        <div className="row mt-2 justify-content-center">
          <div className=" text-primary-emphasis">
            <form onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="type" className="fs-4 mb-2">Type</label>
                <select
                  id="type"
                  name="type"
                  className="form-select form-control border-primary fs-5 mb-4 py-2"
                  aria-label="Types"
                  value={formData.type}
                  onChange={changeForm}
                  required
                >
                  <option value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="category" className="fs-4 mb-2">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-select form-control border-primary fs-5 mb-4 py-2"
                  aria-label="Types"
                  value={formData.category}
                  onChange={changeForm}
                  required
                >
                  <option value="">Select categories</option>
                  {
                    categories.map((category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    )))
                  }
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="amount" className="fs-4 mb-2">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  id="amount"
                  name="amount"
                  className="form-control border-primary fs-5 mb-3 py-2"
                  placeholder="Enter amount"
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <button
                  type="submit"
                  className="btn btn-success text-white fs-4 px-5 py-2 mb-3 me-3"
                  disabled={isCreatingLoading || formData.type === '' || formData.amount === ''}
                >
                  {isCreatingLoading && <ButtonSpinner/>}
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MyModal>
  );
};

export default TransactionForm;