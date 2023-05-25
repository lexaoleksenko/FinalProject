import { React, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import Navbar from './components/MultiComponentsIC/Navbar/Navbar';
import Footer from './components/Simple/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import ItemCardPage from './pages/ItemCardPage/ItemCardPage';
import ItemsListPage from './pages/ItemsListPage/ItemsListPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';
import LogInPage from './pages/LogInPage/LogInPage';
import SigInPage from './pages/SigInPage/SigInPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import ContactPage from './pages/ContactPage/ContactPage';
import SuccessfulOrder from './pages/SuccessfulOrderPage/SuccessfulOrder';

import { setSelectedProducts } from './redux/slices/cartLocal';
import { setSelectedProductsFav } from './redux/slices/wishList';
import { fetchCartProducts } from './redux/slices/cartBackEnd';

import { isAuthenticated } from './helpers/authentication/authentication';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuth = isAuthenticated();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCartProducts());
    }
  }, []);

  useEffect(() => {
    const localStorageProducts = localStorage.getItem('products');
    if (localStorageProducts) {
      dispatch(setSelectedProducts(JSON.parse(localStorageProducts)));
    }
    const localStorageProductsFav = localStorage.getItem('favorites');
    if (localStorageProductsFav) {
      dispatch(setSelectedProductsFav(JSON.parse(localStorageProductsFav)));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // очищаем таймер при размонтировании компонента
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<HomePage aboutUs />} />
        <Route path="/products/filter?" element={<ItemsListPage />} />
        <Route path="/products/:itemNo" element={<ItemCardPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SigInPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/successful-order" element={<SuccessfulOrder />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
