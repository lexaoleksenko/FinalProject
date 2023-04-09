import React from 'react';
// import { Routes, Route } from "react-router-dom";

import Navbar from './components/Smart/Navbar/Navbar';
import Footer from './components/Simple/Footer/Footer';

import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
