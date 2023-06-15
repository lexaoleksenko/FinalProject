import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MainCardSlider from '../../Simple/MainCardSlider/MainCardSlider';
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

const CardWrapper = styled(Card)`
  display: flex;
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 1300px) {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;
const CardInfo = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  margin-left: 15px;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const CardHeader = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const CardHeaderName = styled(Typography)`
  && {
    &.MuiTypography-root {
      font-weight: 600;
      font-size: 25px;
      color: #000000;
      padding: 10px;
      text-transform: uppercase;
      &:first-child {
        border-bottom: 1px solid #000000;
      }
      @media (max-width: 768px) {
        padding: 5px;
        font-size: 20px;
      }
    }
  }
`;
const CardHeaderPrice = styled(Typography)`
  && {
    &.MuiTypography-root {
      font-size: 35px;
      font-weight: 800;
      padding: 10px;
      @media (max-width: 768px) {
        padding: 5px;
        font-size: 20px;
      }
    }
  }
`;
const CardDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #000000;
`;
const CardDescriptionInfo = styled(Typography)`
  && {
    &.MuiTypography-root {
      background-color: #ffffff;
      padding: 10px;
      border-radius: 4px;
      font-size: 18px;
      margin-right: auto;
    }
  }
`;
const CardButtons = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const CardFavButton = styled.button`
  background-color: #ffffff00;
  border: 0;
  cursor: pointer;
`;
function MainCard({
  product,
  imageUrls,
  name,
  currentPrice,
  color,
  description,
}) {
  const dispatch = useDispatch();

  // *** Not authorized logic ***

  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedProductsFav));
  }, [selectedProductsFav]);

  useEffect(() => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    setIsFavorite(Boolean(isExist));
  }, ['favorites', selectedProductsFav]);

  const handleBuyNow = e => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === product.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(product);
    dispatch(setSelectedProducts(data));
  };
  const handleAddToFav = () => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    if (isExist) return;

    const data = selectedProductsFav.concat(product);
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
  const location = useLocation();

  const handleBuyCartBack = () => {
    if (isDisabled) {
      return;
    }
    dispatch(fetchAddProductsCart({ productId: product._id }));
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
  }, [
    selectedProducts,
    isAuth,
    productsCartBack,
    location.pathname,
    product.itemNo,
  ]);

  // Logic added BrowsingHistory

  useEffect(() => {
    const prodBrowsingHistory = JSON.parse(
      localStorage.getItem('prodBrowsingHistory') || '[]',
    );

    const isProductInHistory = prodBrowsingHistory.some(
      item => item._id === product._id,
    );

    if (!isProductInHistory) {
      if (prodBrowsingHistory.length === 4) {
        prodBrowsingHistory.pop();
      }

      prodBrowsingHistory.unshift(product);

      localStorage.setItem(
        'prodBrowsingHistory',
        JSON.stringify(prodBrowsingHistory),
      );
    }
  }, [product]);

  // logick modalImg

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  // mob display logic

  const isMobile = useMediaQuery('(max-width:760px)');

  return (
    <>
      <CardWrapper>
        <Box style={isMobile ? { width: '100%' } : { width: '48%' }}>
          <MainCardSlider
            imageUrls={imageUrls}
            toggleModal={handleToggleModal}
          />
        </Box>
        <CardInfo>
          <CardHeader>
            <CardHeaderName>{name}</CardHeaderName>
            <CardHeaderPrice>{currentPrice}$</CardHeaderPrice>
          </CardHeader>
          <CardDescription>
            <CardDescriptionInfo>Color: {color}</CardDescriptionInfo>
            <CardDescriptionInfo>{description}</CardDescriptionInfo>
          </CardDescription>
          <CardButtons>
            <NavLink onClick={isAuth ? handleBuyCartBack : handleBuyNow}>
              <ButtonDark
                label={isDisabled ? 'Added' : 'BUY NOW'}
                disabled={isDisabled}
                style={{ fontWeight: 800, fontSize: 25 }}
              />
            </NavLink>
            <CardFavButton onClick={handleToggleFavorite}>
              {isFavorite ? (
                <FavoriteIcon
                  style={{
                    color: 'red',
                    width: 55,
                    height: 55,
                    borderRadius: 5,
                  }}
                />
              ) : (
                <FavoriteIcon
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 5,
                  }}
                />
              )}
            </CardFavButton>
          </CardButtons>
        </CardInfo>
      </CardWrapper>
      <Modal
        open={isOpenModal}
        onClose={handleToggleModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
        }}
      >
        <Box style={isMobile ? { width: '100%' } : { width: '48%' }}>
          <MainCardSlider imageUrls={imageUrls} arrows />
        </Box>
      </Modal>
    </>
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
