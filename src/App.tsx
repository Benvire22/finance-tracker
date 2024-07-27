import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Categories from './containers/Categories/Categories';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;