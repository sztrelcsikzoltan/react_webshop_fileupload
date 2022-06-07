import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import ProductListPage from './ProductListPage';
import ProductSinglePage from './ProductSinglePage';
import ProductCreatePage from './ProductCreatePage';
import ProductUpdatePage from './ProductUpdatePage';
import ProductUpdate from './ProductUpdate';
import ProductDeletePage from './ProductDeletePage';
import ProductDelete from './ProductDelete';

function App() {
  return (
    <BrowserRouter>
      <nav className='navbar-expand-sm bg-secondary'>
        <ul className='navbar-nav'>
          <li>
            <NavLink className='nav-link' to='/'>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='/new-product'>
              New product
            </NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='/update'>
              Update
            </NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='/delete'>
              Delete
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<ProductListPage />}></Route>
        <Route path='/product/:productId' element={<ProductSinglePage />}></Route>
        <Route path='/new-product' element={<ProductCreatePage />}></Route>
        <Route path='/update' element={<ProductUpdatePage />}></Route>
        <Route path='/update/:productId' element={<ProductUpdate />}></Route>
        <Route path='/delete' element={<ProductDeletePage />}></Route>
        <Route path='/delete/:productId' element={<ProductDelete />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
