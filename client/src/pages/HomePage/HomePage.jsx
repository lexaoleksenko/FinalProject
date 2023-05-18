import { React, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import style from './Home.module.scss';

import MainSlider from '../../components/Smart/MainSlider/MainSlider';
import MobiStoreInfo from '../../components/Simple/MobiStoreInfoSection/MobiStoreInfo';
import SpecialOfferSec from '../../components/Simple/SpecialOfferSection/SpecialOfferSec';
import AccessoriesInfo from '../../components/Simple/AccessoriesInfoSection/AccessoriesInfo';
import VideoSec from '../../components/Simple/videoSection/VideoSec';
import TradeInSec from '../../components/Simple/TradeInSection/TradeInSec';

function HomePage({ aboutUs }) {
  const infoRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (aboutUs) {
      infoRef.current.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    }
  }, [location.pathname]);

  return (
    <div className={style.homePage}>
      <MainSlider />
      <TradeInSec />
      <VideoSec />
      <AccessoriesInfo />
      <SpecialOfferSec />
      <div ref={infoRef}>
        <MobiStoreInfo />
      </div>
    </div>
  );
}

HomePage.defaultProps = {
  aboutUs: false,
};

HomePage.propTypes = {
  aboutUs: PropTypes.bool,
};

export default HomePage;
