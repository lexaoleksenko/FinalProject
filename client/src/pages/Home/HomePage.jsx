import React from 'react';

// import { Container } from '@mui/material';
import MainSlider from '../../components/Smart/MainSlider/MainSlider';
import Marquee from '../../components/Simple/Marquee/Marquee';
import MobiStoreInfo from '../../components/Simple/MobiStoreInfoSection/MobiStoreInfo';
import SpecialOfferSec from '../../components/Simple/SpecialOfferSection/SpecialOfferSec';
import AccessoriesInfo from '../../components/Simple/AccessoriesInfoSection/AccessoriesInfo';
import VideoSec from '../../components/Simple/videoSection/VideoSec';
import TradeInSec from '../../components/Simple/TradeInSection/TradeInSec';
import style from './Home.module.scss';

function HomePage() {
  return (
    <div className={style.homePage}>
      <Marquee content="Sell-out!!!" />
      <MainSlider />
      <Marquee stream="right" content="Sell-out!!!" />
      <TradeInSec />
      <VideoSec />
      <AccessoriesInfo />
      <SpecialOfferSec />
      <MobiStoreInfo />
    </div>
  );
}

export default HomePage;
