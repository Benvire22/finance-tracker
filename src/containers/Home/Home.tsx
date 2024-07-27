import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTransactions} from '../../store/financeSlice';
import {useEffect} from 'react';
import {fetchCategories, fetchTransaction} from '../../store/financeThunks';
import dayjs from 'dayjs';
import {Transaction} from '../../types';

const Home = () => {
  const transactions = useAppSelector(selectTransactions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchTransaction());
    void dispatch(fetchCategories());
  }, [dispatch]);

  const getTotalSum = () => {
    return transactions.reduce((acc, trancs) => {
      if (trancs.type === 'income') {
        return acc + trancs.amount;
      } else {
        return acc - trancs.amount;
      }
    },0);
  };

  const getAmount = (transaction: Transaction) => {
      if (transaction.type === 'income') {
        return `+${transaction.amount}`;
      } else {
        return `-${transaction.amount}`;
      }
  };

  return (
    <>
      <div className="row">
        <div className="col-5 text-center border p-5 mb-5">
          <h1 className="p-5">Total: <span className="text-success">{getTotalSum()} KGS</span></h1>
        </div>
        {transactions.map((transaction) => (
          <div className="d-flex align-items-center justify-content-between border p-3 mb-3 fs-5" key={transaction.id}>
            <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
            <strong>{transaction.type}</strong>
            <strong className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>{getAmount(transaction)}</strong>
            <button className="btn btn-primary fs-5">Edit transaction</button>
          </div>
        )).reverse()}
      </div>
    </>
  );
};

export default Home;