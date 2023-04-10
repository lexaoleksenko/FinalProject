import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Smart/Navbar/Navbar';
import Footer from './components/Simple/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import ItemCardPage from './pages/ItemCardPage/ItemCardPage';
import ItemsListPage from './pages/ItemsListPage/ItemsListPage';
import CartPage from './pages/Cart/CartPage';

function App() {
  return (
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
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
