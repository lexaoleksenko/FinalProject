import { React } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from './MainCardSlider.module.scss';

function MainCardSlider() {
  const dotsDisabled = true;

  return (
    <Slider
      dots={dotsDisabled}
      infinite="true"
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={false}
      arrows={false}
      className={style.slick_slider}
      dotsClass={style['slick-dots']}
    >
      <div className={style.slick_slide}>
        <img src="/logo2.png" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/logo2.png" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/logo2.png" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/logo2.png" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/logo2.png" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/logo2.png" alt="2" />
      </div>
    </Slider>
  );
}

export default MainCardSlider;
