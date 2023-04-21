import React from 'react';
import { Divider, ListItem } from '@mui/material';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import BasketQuantity from '../BasketQuantity/BasketQuantity';
import style from './ProductOrderInfo.module.scss';

function ProductOrderInfo() {
  return (
    <ListItem>
      <div className={style.items}>
        <div className={style.info}>
          <div className={style.img}>
            <img
              src="https://cdn.tehnoezh.ua/0/0/0/0/4/4/5/6/3/000044563_545_545.jpeg"
              alt=""
            />
          </div>
          <div>
            <h4 className={style.text}>Apple iPhone 14 128 Gb Starlight</h4>
            <div className={style.buttons}>
              <BasketQuantity />
              <div>
                <IconButton>
                  <Close />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div className={style.amount}>
          <p className={style.text}>Amount: 1500$</p>
        </div>
      </div>
      <Divider />
    </ListItem>
  );
}

export default ProductOrderInfo;
