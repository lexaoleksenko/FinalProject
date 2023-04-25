import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import { Box, Button, Typography, Divider } from '@mui/material';
import styled from 'styled-components';
import style from './itemstable.module.scss';

export const Wrapper = styled.div`
  display: flex;
  max-width: 300px;
  flex-direction: column;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
  padding-bottom: 20px;

  div {
    flex: 1;
  }

  .buttons {
    display: flex;
    justify-content: space-evenly;
  }

  .buttons {
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;
  }

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;

const itemPropType = PropTypes.shape({
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

const itemsPropType = PropTypes.arrayOf(itemPropType);

function ShoppingCartItem({ items, remove, increase, decrease }) {
  return (
    <Wrapper>
      {items?.map(item => (
        <div className={style.items}>
          <div className={style.image}>
            <img src={item.imageUrls[0]} alt="img" />
          </div>
          <div className={style.position}>
            <div>
              <Box className={style.info} key={item.itemNo}>
                <Typography className={style.name}>{item.name}</Typography>
                <Typography>Price: ${item.currentPrice}</Typography>
              </Box>
            </div>
            <div>
              <div className={style.location}>
                <div>
                  <Box className={style.buttons}>
                    <Button
                      className={style.button}
                      sx={{ backgroundColor: '#A9A9A9', fontSize: 25 }}
                      onClick={() => decrease(item.itemNo, item.quantity)}
                      disabled={item.quantity < 2}
                    >
                      -
                    </Button>
                    <p className={style.item}>{item.quantity}</p>
                    <Button
                      className={style.button}
                      sx={{ backgroundColor: '#A9A9A9', fontSize: 25 }}
                      onClick={() => increase(item.itemNo)}
                    >
                      +
                    </Button>
                  </Box>
                </div>
                <div className={style.delete}>
                  <Button
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
    </Wrapper>
  );
}

ShoppingCartItem.defaultProps = {
  items: [],
};

ShoppingCartItem.propTypes = {
  items: itemsPropType,
  remove: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
