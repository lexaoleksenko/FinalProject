import React from 'react';

import { Container } from '@mui/material';

import MainSlider from '../../components/Smart/MainSlider/MainSlider';
import Marquee from '../../components/Simple/Marquee/Marquee';

function HomePage() {
  return (
    <>
      <Marquee content="Sell-out!!!" />
      <MainSlider />
      <Marquee stream="right" content="Sell-out!!!" />
      <Container maxWidth="lg">
        <p>1111</p>
      </Container>
    </>
  );
}

export default HomePage;
