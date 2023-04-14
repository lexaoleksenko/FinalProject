import { React, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Smart/Navbar/Navbar';
import Footer from './components/Simple/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import ItemCardPage from './pages/ItemCardPage/ItemCardPage';
import ItemsListPage from './pages/ItemsListPage/ItemsListPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';
import CartPage from './pages/Cart/CartPage';
import LogInPage from './pages/LogInPage/LogInPage';
import SigInPage from './pages/SigInPage/SigInPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';

function App() {
  const [loading, setLoading] = useState(true);

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
      </Routes>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/card-list" element={<ItemsListPage />} />
          <Route path="/card" element={<ItemCardPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Container>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/sigin" element={<SigInPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
