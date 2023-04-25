import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useDispatch, useSelector } from 'react-redux';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

import style from './ListCard.module.scss';
import {
  addProducts,
  // fetchCartProduct,
  stateCartProd,
  toggleDrawer,
  // toggleDrawer,
} from '../../../redux/slices/shopping-cart';

function ListCard({
  product,
  name,
  currentPrice,
  imageUrl,
  itemNo,
  lg,
  md,
  sm,
}) {
  const dispatch = useDispatch();
  const products = useSelector(stateCartProd);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleBuyNow = (e, params) => {
    e.stopPropagation();
    dispatch(addProducts(params));
  };
  return (
    <Grid item xs={12} sm={sm} md={md} lg={lg}>
      {' '}
      <Stack spacing={4}>
        <NavLink to={`/product/${itemNo}`} className={style.mainLink}>
          <Card className={style.card}>
            <CardMedia
              className={style.cardMedia}
              component="img"
              image={imageUrl}
              alt={name}
            />
            <CardContent className={style.cardContent}>
              <div className={style.typography}>
                <Typography variant="p">{name}</Typography>
                <Typography variant="p">{currentPrice}$</Typography>
              </div>
              <div className={style.cardIcon}>
                <NavLink onClick={e => handleBuyNow(e, product)}>
                  <ButtonDark label="BUY NOW" />
                </NavLink>
                <button className={style.cardFavButton} type="button">
                  <FavoriteIcon />
                </button>
              </div>
            </CardContent>
          </Card>
        </NavLink>
      </Stack>
    </Grid>
  );
}

ListCard.defaultProps = {
  product: {},
  name: 'iPhone 14 Pro Max',
  currentPrice: '1000$',
  imageUrl: './logo2.png',
  itemNo: '00000',
  lg: 4,
  md: 4,
  sm: 6,
};

ListCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object,
  name: PropTypes.string,
  currentPrice: PropTypes.string,
  imageUrl: PropTypes.string,
  itemNo: PropTypes.string,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
};

export default ListCard;
