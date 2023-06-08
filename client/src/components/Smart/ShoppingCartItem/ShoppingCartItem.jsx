import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import { Box, Button, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/cartLocal';
import { isAuthenticated } from '../../../helpers/authentication/authentication';

const itemPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  itemNo: PropTypes.string,
});

const itemsPropType = PropTypes.arrayOf(itemPropType);

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 5px;
  max-width: 410px;
  margin-right: 15px;
  font-family: 'montserrat';
`;
const Items = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 5px;
  max-width: 350px;
`;
const Img = styled.img`
  max-width: 150px;
  object-fit: cover;
  overflow: hidden;
`;
const InfoWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const InfoTitle = styled(Box)`
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  margin: 0;
  padding: 5px 2px;
`;
const InfoPrice = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  padding: 5px;
  margin: 0;
`;
const ButtonsWrapper = styled(Box)`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;
const Buttons = styled(Box)`
  padding: 2px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonDelete = styled(Button)`
  && {
    &.MuiButton-root {
      padding: 2px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 30px;
      min-width: 0;
      width: 30px;
      background-color: #000000;
      color: #ffffff;
    }
  }
`;

const ButtonIncrease = styled(Button)`
  && {
    &.MuiButton-root {
      height: 30px;
      min-width: 0;
      width: 30px;
      background-color: #000000;
      color: #ffffff;
    }
  }
`;
const ButtonDecrease = styled(Button)`
  && {
    &.MuiButton-root {
      height: 30px;
      min-width: 0;
      width: 30px;
      background-color: black;
      color: white;
    }
  }
`;
const Item = styled(Typography)`
  padding: 0 10px;
  margin: 0;
`;
function ShoppingCartItem({
  buttonDisplay,
  quantityDisplay,
  searchSettings,
  items,
  remove,
  increase,
  decrease,
  addItemBack,
  itemBack,
  cartBackQuantity,
  removeBack,
  increaseBack,
  decreaseBack,
  popperClose,
}) {
  const isAuth = isAuthenticated();
  const dispatch = useDispatch();
  const selectedProducts = useSelector(stateSelectedProducts);
  const handleBuyNow = (e, params) => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(params);
    dispatch(setSelectedProducts(data));
  };
  if (!isAuth || searchSettings) {
    return (
      <Wrapper>
        {items?.map(item => (
          <Items key={item.itemNo}>
            <NavLink to={`/products/${item.itemNo}`} onClick={popperClose}>
              <Img src={item.imageUrls[0]} alt="img" />
            </NavLink>
            <InfoWrapper>
              <Box sx={{ padding: '5px' }}>
                <NavLink
                  to={`/products/${item.itemNo}`}
                  style={{ color: '#000000', textDecoration: 'none' }}
                >
                  <InfoTitle>{item.name}</InfoTitle>
                </NavLink>
                <InfoPrice>Price: ${item.currentPrice}</InfoPrice>
              </Box>
              <ButtonsWrapper>
                <Buttons>
                  {buttonDisplay ? null : (
                    <ButtonDecrease
                      style={
                        searchSettings
                          ? {
                              width: '100px',
                              fontSize: '15px',
                              marginLeft: '40px',
                              marginRight: 'auto',
                            }
                          : ''
                      }
                      size="small"
                      sx={{
                        backgroundColor: '#A9A9A9',
                        fontSize: 25,
                      }}
                      onClick={
                        searchSettings
                          ? e =>
                              isAuth
                                ? addItemBack(item._id)
                                : [handleBuyNow(e, item), popperClose()]
                          : () => decrease(item.itemNo, item.quantityCart)
                      }
                    >
                      {searchSettings ? 'Buy now' : '-'}
                    </ButtonDecrease>
                  )}
                  {searchSettings ? null : (
                    <Item>
                      {quantityDisplay
                        ? `Qty: ${item.quantityCart}`
                        : item.quantityCart}
                    </Item>
                  )}
                  {buttonDisplay || searchSettings ? null : (
                    <ButtonIncrease
                      sx={{
                        backgroundColor: '#A9A9A9',
                        fontSize: 25,
                      }}
                      onClick={() => increase(item.itemNo)}
                    >
                      +
                    </ButtonIncrease>
                  )}
                </Buttons>
                {buttonDisplay || searchSettings ? null : (
                  <ButtonDelete
                    sx={{ fontSize: 15 }}
                    onClick={() => remove(item.itemNo)}
                  >
                    <Close />
                  </ButtonDelete>
                )}
              </ButtonsWrapper>
              <Divider />
            </InfoWrapper>
          </Items>
        ))}
      </Wrapper>
    );
  }
  if (isAuth && !searchSettings) {
    return (
      <Wrapper>
        <Items>
          <NavLink to={`/products/${itemBack.itemNo}`} onClick={popperClose}>
            <Img src={itemBack.imageUrls[0]} alt="img" />
          </NavLink>
          <InfoWrapper>
            <Box sx={{ padding: '5px' }}>
              <NavLink
                to={`/products/${itemBack.itemNo}`}
                onClick={popperClose}
                style={{ color: '#000000', textDecoration: 'none' }}
              >
                <InfoTitle>{itemBack.name}</InfoTitle>
              </NavLink>
              <InfoPrice>Price: ${itemBack.currentPrice}</InfoPrice>
            </Box>
            <ButtonsWrapper>
              <Buttons>
                {buttonDisplay ? null : (
                  <ButtonDecrease
                    style={{ width: searchSettings ? '150px' : '' }}
                    size="small"
                    sx={{
                      backgroundColor: '#A9A9A9',
                      fontSize: 20,
                    }}
                    onClick={() => decreaseBack(itemBack._id, cartBackQuantity)}
                  >
                    -
                  </ButtonDecrease>
                )}
                {searchSettings ? null : (
                  <Item>
                    {quantityDisplay
                      ? `Qty: ${cartBackQuantity}`
                      : cartBackQuantity}
                  </Item>
                )}
                {buttonDisplay || searchSettings ? null : (
                  <ButtonIncrease
                    sx={{
                      backgroundColor: '#A9A9A9',
                      fontSize: 25,
                    }}
                    onClick={() => increaseBack(itemBack._id)}
                  >
                    +
                  </ButtonIncrease>
                )}
              </Buttons>
              {buttonDisplay || searchSettings ? null : (
                <ButtonDelete
                  sx={{ fontSize: 15 }}
                  onClick={() => removeBack(itemBack._id)}
                >
                  <Close />
                </ButtonDelete>
              )}
            </ButtonsWrapper>
            <Divider />
          </InfoWrapper>
        </Items>
      </Wrapper>
    );
  }
}

ShoppingCartItem.defaultProps = {
  buttonDisplay: false,
  searchSettings: false,
  items: {
    _id: null,
    name: null,
    price: null,
    img: null,
    count: null,
  },
  quantityDisplay: false,
  itemBack: {
    _id: null,
    name: null,
    price: null,
    img: null,
    count: null,
  },
  remove: null,
  increase: null,
  decrease: null,
  cartBackQuantity: null,
  increaseBack: null,
  decreaseBack: null,
  removeBack: null,
  addItemBack: null,
  popperClose: null,
};

ShoppingCartItem.propTypes = {
  buttonDisplay: PropTypes.bool,
  quantityDisplay: PropTypes.bool,
  searchSettings: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  items: itemsPropType,
  remove: PropTypes.func,
  increase: PropTypes.func,
  decrease: PropTypes.func,
  itemBack: itemPropType,
  cartBackQuantity: PropTypes.number,
  increaseBack: PropTypes.func,
  decreaseBack: PropTypes.func,
  removeBack: PropTypes.func,
  addItemBack: PropTypes.func,
  popperClose: PropTypes.func,
};

export default ShoppingCartItem;
