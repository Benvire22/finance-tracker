import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  addTransactionModal,
  changeTotalSum,
  getCurrentTransaction, selectTransactionLoading,
  selectTransactions
} from '../../store/financeSlice';
import {useEffect} from 'react';
import {fetchCategories, fetchTransaction} from '../../store/financeThunks';
import dayjs from 'dayjs';
import {Transaction} from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const transactions = useAppSelector(selectTransactions);
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectTransactionLoading);

  useEffect(() => {
    try {
      void dispatch(fetchTransaction());
      void dispatch(fetchCategories());
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  const getTotalSum = () => {
    const sum = transactions.reduce((acc, trancs) => {
      if (trancs.type === 'income') {
        return acc + trancs.amount;
      } else {
        return acc - trancs.amount;
      }
    },0);
    dispatch(changeTotalSum(sum));
    return sum;
  };


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
      {fetchLoading && <Spinner />}
      <div className="row">
        <div className="col-5 text-center border p-5 mb-5">
          <h1 className="p-5">Total: <span className="text-success">{getTotalSum()} KGS</span></h1>
        </div>
        {transactions.map((transaction) => (
          <div className="d-flex align-items-center justify-content-between border p-3 mb-3 fs-5" key={transaction.id}>
            <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
            <strong>{transaction.type}</strong>
            <strong className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>{getAmount(transaction)}</strong>
            <button className="btn btn-primary fs-5" onClick={() => getCurrent(transaction)}>Edit transaction</button>
          </div>
        )).reverse()}
      </div>
    </>
  );
};

export default Home;