import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import { Box, Button, Typography, Divider } from '@mui/material';
import style from './itemstable.module.scss';

const itemPropType = PropTypes.shape({
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

const itemsPropType = PropTypes.arrayOf(itemPropType);

function ShoppingCartItem({
  buttonDisplay,
  items,
  remove,
  increase,
  decrease,
}) {
  return (
    <div className={style.wrapper}>
      {items?.map(item => (
        <div className={style.items}>
          <img className={style.image} src={item.imageUrls[0]} alt="img" />
          <div className={style.position}>
            <Box className={style.info} key={item.itemNo}>
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
                      sx={{ backgroundColor: '#A9A9A9', fontSize: 25 }}
                      onClick={() => decrease(item.itemNo, item.quantity)}
                      disabled={item.quantity < 2}
                    >
                      -
                    </Button>
                    <p className={style.item}>&times;{item.quantity}</p>
                    <Button
                      className={`${
                        buttonDisplay ? style.buttonsNone : style.button
                      }`}
                      sx={{ backgroundColor: '#A9A9A9', fontSize: 25 }}
                      onClick={() => increase(item.itemNo)}
                    >
                      +
                    </Button>
                  </Box>
                </div>
                <div className={style.delete}>
                  <Button
                    className={`${
                      buttonDisplay ? style.buttonsNone : style.button
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
  items: [],
  buttonDisplay: false,
};

ShoppingCartItem.propTypes = {
  buttonDisplay: PropTypes.bool,
  items: itemsPropType,
  remove: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
