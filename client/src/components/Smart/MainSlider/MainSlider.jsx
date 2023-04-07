import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from './MainSlider.module.scss';

function MainSlider() {
  const dotsDisabled = true;

  return (
    <Slider
      dots={dotsDisabled}
      infinite="true"
      speed={1000}
      slidesToShow={2}
      slidesToScroll={1}
      autoplay="true"
      autoplaySpeed={5000}
      arrows={false}
      className={style.slick_slider}
      dotsClass={style['slick-dots']}
    >
      <div className={style.slick_slide}>
        <img src="/iphon1.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/iphon2.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/iphon3.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/iphon4.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/iphon5.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/iphon6.jpg" alt="2" />
      </div>
    </Slider>
  );
}

export default MainSlider;
