import dayjs from 'dayjs';
import {
  addTransactionModal,
  getCurrentTransaction,
  selectTransactions
} from '../../store/financeSlice';
import {Transaction} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchCategories, fetchTransaction} from '../../store/financeThunks';

const TransactionsItems = () => {
  const transactions = useAppSelector(selectTransactions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchTransaction());
      void dispatch(fetchCategories());
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  const getAmount = (transaction: Transaction) => {
    if (transaction.type === 'income') {
      return `+${transaction.amount}`;
    } else {
      return `-${transaction.amount}`;
    }
  };

  const getCurrent = (transaction: Transaction) => {
    dispatch(getCurrentTransaction(transaction));
    dispatch(addTransactionModal());
  };
  return (
    <>
      {transactions.length > 0 ?  (
        transactions.map((transaction) => (
          <div className="d-flex align-items-center justify-content-between border p-3 mb-3 fs-5" key={transaction.id}>
            <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
            <strong>{transaction.type}</strong>
            <strong
              className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>{getAmount(transaction)}</strong>
            <button className="btn btn-primary fs-5" onClick={() => getCurrent(transaction)}>Edit transaction</button>
          </div>
        )).reverse()
      ) : (
        <h2 className="text-secondary my-3 text-center">Empty...</h2>
      )}
    </>
  );
};

export default TransactionsItems;