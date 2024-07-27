import React, {PropsWithChildren} from 'react';
import Toolbar from '../Toolbar/Toolbar';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container-xl mt-5 ">
        {children}
      </main>
    </>
  );
};

export default Layout;