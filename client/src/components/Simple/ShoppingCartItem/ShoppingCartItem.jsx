import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import { Box, Button, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/shopping-cart';
import style from './itemstable.module.scss';

const itemPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  img: PropTypes.string,
  count: PropTypes.number,
});

const itemsPropType = PropTypes.arrayOf(itemPropType);

function ShoppingCartItem({
  buttonDisplay,
  searchSettings,
  items,
  remove,
  increase,
  decrease,
}) {
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
  return (
    <div className={style.wrapper}>
      {items?.map(item => (
        <div className={style.items} key={item.itemNo}>
          <img className={style.image} src={item.imageUrls[0]} alt="img" />
          <div className={style.position}>
            <Box className={style.info}>
              <Typography className={style.name}>{item.name}</Typography>
              <Typography className={style.price}>
                Price: ${item.currentPrice}
              </Typography>
            </Box>
            <div>
              <div className={style.location}>
                <div>
                  <Box className={style.buttons}>
                    <Button
                      className={`${
                        buttonDisplay ? style.buttonsNone : style.button
                      }`}
                      style={{ width: searchSettings ? '150px' : '' }}
                      sx={{
                        backgroundColor: '#A9A9A9',
                        fontSize: 20,
                      }}
                      size="small"
                      onClick={
                        searchSettings
                          ? e => handleBuyNow(e, item)
                          : () => decrease(item.itemNo, item.quantity)
                      }
                    >
                      {searchSettings ? 'Buy now' : '-'}
                    </Button>
                    <p className={searchSettings ? style.itemNone : style.item}>
                      &times;{item.quantity}
                    </p>
                    <Button
                      className={`${
                        buttonDisplay || searchSettings
                          ? style.buttonsNone
                          : style.button
                      }`}
                      sx={{
                        backgroundColor: '#A9A9A9',
                        fontSize: 25,
                      }}
                      onClick={() => increase(item.itemNo)}
                    >
                      +
                    </Button>
                  </Box>
                </div>
                <div className={style.delete}>
                  <Button
                    className={`${
                      buttonDisplay || searchSettings
                        ? style.buttonsNone
                        : style.button
                    }`}
                    sx={{ fontSize: 15 }}
                    onClick={() => remove(item.itemNo)}
                  >
                    <Close />
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      ))}
    </div>
  );
}

ShoppingCartItem.defaultProps = {
  items: {
    _id: null,
    name: null,
    price: null,
    img: null,
    count: null,
  },
  buttonDisplay: false,
  searchSettings: false,
};

ShoppingCartItem.propTypes = {
  buttonDisplay: PropTypes.bool,
  searchSettings: PropTypes.bool,
  items: itemsPropType,
  remove: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
