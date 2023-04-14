import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';

import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

import style from './ListCard.module.scss';

function ListCard({ name, currentPrice, imageUrls, _id, lg, md, sm }) {
  return (
    <Grid item xs={12} sm={sm} md={md} lg={lg}>
      {' '}
      <Stack spacing={4}>
        <NavLink to="/card" className={style.mainLink}>
          <Card className={style.card}>
            <CardMedia
              className={style.cardMedia}
              component="img"
              image={imageUrls}
              alt={name}
            />
            <CardContent className={style.cardContent}>
              <div className={style.typography}>
                <Typography variant="p">{name}</Typography>
                <Typography variant="p">{currentPrice}</Typography>
              </div>
              <div className={style.cardIcon}>
                <NavLink to={_id}>
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
  name: 'iPhone 14 Pro Max',
  currentPrice: '1000$',
  imageUrls: './logo2.png',
  _id: '/',
  lg: 4,
  md: 4,
  sm: 6,
};

ListCard.propTypes = {
  name: PropTypes.string,
  currentPrice: PropTypes.string,
  imageUrls: PropTypes.string,
  _id: PropTypes.string,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
};

export default ListCard;
