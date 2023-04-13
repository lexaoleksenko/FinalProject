import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';

import AvatarUser from '../../UI/Avatar/AvatapUser';

import style from './NavIcon.module.scss';

function NavIcon({ cartCount, favCount, nameAvatar, avatarSrc, isAuth }) {
  return (
    <div className={style.root}>
      <div className={style.containerIcon}>
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
      <div className={style.containerAvatar}>
        <NavLink to={isAuth ? '/' : '/'} className={style.link}>
          <AvatarUser
            nameAvatar={nameAvatar}
            avatarSrc={avatarSrc}
            isAuth={isAuth}
          />
        </NavLink>
      </div>
    </div>
  );
}

NavIcon.defaultProps = {
  avatarSrc: '#',
  cartCount: 666,
  favCount: 999,
  nameAvatar: 'Jhon Dou',
  isAuth: false,
};

NavIcon.propTypes = {
  avatarSrc: PropTypes.string,
  cartCount: PropTypes.number,
  favCount: PropTypes.number,
  nameAvatar: PropTypes.string,
  isAuth: PropTypes.bool,
};

export default NavIcon;