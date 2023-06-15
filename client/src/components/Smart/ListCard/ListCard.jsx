import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Stack,
  useMediaQuery,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/cartLocal';

import {
  setSelectedProductsFav,
  stateSelectedProductsFav,
} from '../../../redux/slices/wishList';

import {
  cartBackState,
  fetchAddProductsCart,
  increaseTotalQuantity,
} from '../../../redux/slices/cartBackEnd';

import { isAuthenticated } from '../../../helpers/authentication/authentication';

const Link = styled(NavLink)`
  text-decoration: none;
  color: #000000;
`;

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

  // *** Not authorized logic ***

  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    setIsFavorite(Boolean(isExist));
  }, ['favorites', selectedProductsFav]);

  const handleBuyNow = (e, params) => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(params);
    dispatch(setSelectedProducts(data));
    setIsDisabled(true);
    // localStorage.setItem(params.itemNo, JSON.stringify(true));
  };

  const handleAddToFav = params => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProductsFav.concat(params);
    dispatch(setSelectedProductsFav(data));
  };

  const handleRemoveFromFav = params => {
    const data = selectedProductsFav.filter(
      item => item.itemNo !== params.itemNo,
    );
    dispatch(setSelectedProductsFav(data));
    setIsFavorite(false);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFav(product);
      localStorage.removeItem(product.itemNo);
    } else {
      handleAddToFav(product);
      localStorage.setItem('favorites', JSON.stringify(product));
    }
  };

  // *** AUTHORIZED logic ***
  const isAuth = isAuthenticated();

  const handleBuyCartBack = (e, prodId) => {
    dispatch(fetchAddProductsCart({ productId: prodId }));
    dispatch(increaseTotalQuantity());
    setIsDisabled(true);
  };

  // logic isDisabled button

  const { productsCartBack } = useSelector(cartBackState);

  useEffect(() => {
    if (isAuth) {
      if (productsCartBack) {
        setIsDisabled(
          productsCartBack.some(item => item.product.itemNo === product.itemNo),
        );
      }
    } else {
      setIsDisabled(
        selectedProducts.some(item => item.itemNo === product.itemNo),
      );
    }
  }, [selectedProducts, isAuth, productsCartBack, product.itemNo]);

  const isMobile = useMediaQuery('(max-width:1170px)');

  return (
    <Grid
      item
      xs={12}
      sm={sm}
      md={md}
      lg={lg}
      style={isMobile ? {} : { maxHeight: '440px' }}
    >
      {' '}
      <Stack spacing={4}>
        <Card>
          <Link to={`/products/${itemNo}`}>
            <CardMedia
              style={{ height: '100%' }}
              component="img"
              image={imageUrl}
              alt={name}
            />
          </Link>
          <CardContent>
            <Link to={`/products/${itemNo}`}>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'montserrat, sans-serif',
                  width: '100%',
                  minHeight: '42px',
                }}
              >
                <Typography
                  variant="p"
                  style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    marginleft: 'auto',
                    marginRight: '0px',
                    marginBottom: '3px',
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="p"
                  style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    marginLeft: 'auto',
                    marginRight: '0px',
                    paddingLeft: '20px',
                  }}
                >
                  {currentPrice}$
                </Typography>
              </Box>
            </Link>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <ButtonDark
                label={isDisabled ? 'Added' : 'BUY NOW'}
                disabled={isDisabled}
                onClick={
                  isAuth
                    ? e => handleBuyCartBack(e, product._id)
                    : e => handleBuyNow(e, product)
                }
              />
              <button
                style={{
                  marginLeft: 'auto',
                  marginRight: '0px',
                  backgroundColor: '#00000000',
                  border: '0',
                  cursor: 'pointer',
                }}
                type="button"
                onClick={handleToggleFavorite}
              >
                <FavoriteIcon
                  style={{ color: isFavorite ? 'red' : '#000000' }}
                />
              </button>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}

ListCard.defaultProps = {
  name: 'iPhone 14 Pro Max',
  currentPrice: 1000,
  imageUrl: './logo2.png',
  itemNo: '00000',
  lg: 4,
  md: 4,
  sm: 6,
};

ListCard.propTypes = {
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
  imageUrl: PropTypes.string,
  itemNo: PropTypes.string,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
};

export default ListCard;
