import React, {PropsWithChildren} from 'react';
import Toolbar from '../Toolbar/Toolbar';
import TransactionForm from '../TransactionForm/TransactionForm';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container-xl mt-5 ">
        {children}
      </main>
      <TransactionForm />
    </>
  );
};

export default Layout;