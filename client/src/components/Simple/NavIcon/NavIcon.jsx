import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';

import style from './NavIcon.module.scss';

function NavIcon({ cartCount, favCount }) {
  return (
    <div className={style.root}>
      <NavLink className={style.link}>
        <IconButton>
          <Badge badgeContent={cartCount} className={style.badge}>
            <ShoppingCartIcon className={style.icon} />
          </Badge>
        </IconButton>
      </NavLink>
      <NavLink className={style.link}>
        <IconButton>
          <Badge badgeContent={favCount} className={style.badge}>
            <FavoriteIcon className={style.icon} />
          </Badge>
        </IconButton>
      </NavLink>
    </div>
  );
}

NavIcon.defaultProps = {
  cartCount: 666,
  favCount: 999,
};

NavIcon.propTypes = {
  cartCount: PropTypes.number,
  favCount: PropTypes.number,
};

export default NavIcon;
