import React from 'react';
// import Container from '@mui/material/Container';
// import { Routes, Route } from "react-router-dom";
import Navbar from './components/Smart/Navbar/Navbar';
import MainSlider from './components/Smart/MainSlider/MainSlider';
import Marquee from './components/Simple/Marquee/Marquee';

function App() {
  return (
    <>
      <Navbar />
      <Marquee />
      <MainSlider />
      <Marquee stream="right" />
      {/* <Container maxWidth="lg"></Container> */}
    </>
  );
}

export default App;
