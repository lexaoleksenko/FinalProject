import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';

import MainCardSlider from '../../Smart/MainCardSlider/MainCardSlider';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

import style from './MainCard.module.scss';

function MainCard({ name, currentPrice }) {
  return (
    <Card className={style.card}>
      <MainCardSlider />
      <CardContent className={style.cardContent}>
        <div className={style.typography}>
          <Typography variant="p">{name}</Typography>
          <Typography variant="p">{currentPrice}</Typography>
        </div>
        <div className={style.cardDescrip}>
          <Typography variant="p">Color: Black</Typography>
          <Typography variant="p">
            {' '}
            Экран (61, OLED (Super Retina XDR), 2532x1170) / Apple A15 Bionic /
            двойная основная камера: 12 Мп + 12 Мп, фронтальная камера: 12 Мп /
            128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM / iOS 16
          </Typography>
        </div>
        <div className={style.cardIcon}>
          <NavLink>
            <ButtonDark
              label="ADD TO CART"
              style={{ fontWeight: 800, fontSize: 25 }}
            />
          </NavLink>
          <button className={style.cardFavButton} type="button">
            <FavoriteIcon
              style={{
                width: 55,
                height: 55,
                borderRadius: 5,
              }}
            />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

MainCard.defaultProps = {
  name: 'iPhone 14 Pro Max',
  currentPrice: '1000$',
};

MainCard.propTypes = {
  name: PropTypes.string,
  currentPrice: PropTypes.string,
};

export default MainCard;
