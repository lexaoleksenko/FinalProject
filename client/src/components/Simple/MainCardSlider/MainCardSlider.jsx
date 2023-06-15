import { React } from 'react';
import { ButtonBase } from '@mui/material';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from './MainCardSlider.module.scss';

function MainCardSlider({ imageUrls, toggleModal, arrows }) {
  const dotsDisabled = true;

  return (
    <Slider
      dots={dotsDisabled}
      infinite="true"
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={false}
      arrows={arrows}
      className={style.slick_slider}
      dotsClass={style['slick-dots']}
    >
      <ButtonBase
        className={style.slick_slide}
        onClick={toggleModal}
        disableRipple
      >
        <img src={imageUrls[0]} alt="2" />
      </ButtonBase>
      <ButtonBase
        className={style.slick_slide}
        onClick={toggleModal}
        disableRipple
      >
        <img src={imageUrls[1]} alt="2" />
      </ButtonBase>
      <ButtonBase
        className={style.slick_slide}
        onClick={toggleModal}
        disableRipple
      >
        <img src={imageUrls[2]} alt="2" />
      </ButtonBase>
      <ButtonBase
        className={style.slick_slide}
        onClick={toggleModal}
        disableRipple
      >
        <img src={imageUrls[3]} alt="2" />
      </ButtonBase>
    </Slider>
  );
}

MainCardSlider.defaultProps = {
  imageUrls: ['/logo2.png', '/logo2.png', '/logo2.png', '/logo2.png'],
  toggleModal: null,
  arrows: false,
};

MainCardSlider.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  toggleModal: PropTypes.func,
  arrows: PropTypes.bool,
};

export default MainCardSlider;
