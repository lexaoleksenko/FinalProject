import { React, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
import PersonalAccount from './pages/PersonalAccount/PersonalAccount';

import { setSelectedProducts } from './redux/slices/cartLocal';
import { setSelectedProductsFav } from './redux/slices/wishList';
import { fetchCartProducts } from './redux/slices/cartBackEnd';

import { isToken } from './helpers/authentication/authentication';
import { fetchCustomerData } from './redux/slices/customer';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isHaveToken = isToken();

  useEffect(() => {
    if (isHaveToken) {
      dispatch(fetchCustomerData())
        .then(customer => {
          dispatch(fetchCartProducts());
          const customerData = JSON.stringify(customer.payload._id);
          window.localStorage.setItem('customer', customerData);
        })
        .catch(error => {
          console.warn('Error fetching customer data:', error);
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('customer');
          navigate('/login');
        });
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
    return () => clearTimeout(timer);
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
        <Route path="/personal-account" element={<PersonalAccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
