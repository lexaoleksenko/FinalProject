import React from 'react';
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
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/shopping-cart';
import {
  setSelectedProductsFav,
  stateSelectedProductsFav,
} from '../../../redux/slices/wishList';

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
  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);
  const handleBuyNow = (e, params) => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(params);
    dispatch(setSelectedProducts(data));
  };
  const handleAddToFav = params => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProductsFav.concat(params);
    dispatch(setSelectedProductsFav(data));
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
                  <ButtonDark
                    label="BUY NOW"
                    disabled={selectedProducts.includes(product.itemNo)}
                  />
                </NavLink>
                <NavLink onClick={() => handleAddToFav(product)}>
                  <button className={style.cardFavButton} type="button">
                    <FavoriteIcon />
                  </button>
                </NavLink>
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
