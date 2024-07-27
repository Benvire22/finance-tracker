import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  changeTotalSum, selectTransactionLoading,
  selectTransactions
} from '../../store/financeSlice';

import Spinner from '../../components/Spinner/Spinner';
import TransactionsItems from './TransactionsItems';

const Home = () => {
  const fetchLoading = useAppSelector(selectTransactionLoading);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  const getTotalSum = () => {
    const sum = transactions.reduce((acc, trans) => {
      if (trans.type === 'income') {
        return acc + trans.amount;
      } else {
        return acc - trans.amount;
      }
    }, 0);
    dispatch(changeTotalSum(sum));
    return sum;
  };

  return (
    <>
      {fetchLoading && <Spinner/>}
      <div className="row">
        <div className="col-5 text-center border p-5 mb-5">
          <h1 className="p-5">Total: <span className="text-success">{getTotalSum()} KGS</span></h1>
        </div>
        <TransactionsItems/>
      </div>
    </>
  );
};

export default Home;