import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MainCardSlider from '../MainCardSlider/MainCardSlider';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import style from './MainCard.module.scss';
import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/shopping-cart';

function MainCard({
  product,
  imageUrls,
  name,
  currentPrice,
  color,
  description,
}) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(stateSelectedProducts);
  const handleBuyNow = e => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === product.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(product);
    dispatch(setSelectedProducts(data));
  };
  return (
    <Card className={style.card}>
      <MainCardSlider imageUrls={imageUrls} />
      <CardContent className={style.cardContent}>
        <div className={style.typography}>
          <Typography variant="p">{name}</Typography>
          <Typography variant="p">{currentPrice}$</Typography>
        </div>
        <div className={style.cardDescrip}>
          <Typography variant="p">Color: {color}</Typography>
          <Typography variant="p">{description}</Typography>
        </div>
        <div className={style.cardIcon}>
          <NavLink onClick={handleBuyNow}>
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
  description: 'Here is some cool product description',
  color: 'Here is some cool color',
};

MainCard.propTypes = {
  product: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.number,
    ]),
  ).isRequired,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  description: PropTypes.string,
  color: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainCard;
