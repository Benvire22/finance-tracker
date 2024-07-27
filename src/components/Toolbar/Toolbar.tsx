import { NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {addTransactionModal} from '../../store/financeSlice';

const Toolbar = () => {
  const dispatch = useAppDispatch();

  return (
    <nav className="navbar py-3 navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-xl">
        <NavLink to="/" className="navbar-brand fst-italic fs-3">Finance Tracker</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3 fs-4">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className="nav-link" aria-current="page">Categories</NavLink>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => dispatch(addTransactionModal())}>Add</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;