import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge, Box, Button, Drawer, Typography } from '@mui/material';

import AvatarUser from '../../UI/Avatar/AvatapUser';

import style from './NavIcon.module.scss';
import ShoppingCart from '../../ShoppingCart';

function NavIcon({ cartCount, favCount, nameAvatar, avatarSrc, isAuth }) {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <Box sx={{ maxWidth: 500 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          variant="text"
          sx={{
            backgroundColor: '#A9A9A9',
            width: 60,
          }}
          onClick={toggleDrawer(anchor, false)}
        >
          X
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 32, color: 'black'}}>
          Shopping Cart
        </Typography>
      </Box>
      <Box
        sx={{ width: 450 }}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <ShoppingCart />
      </Box>
    </Box>
  );

  return (
    <div className={style.root}>
      <div className={style.containerIcon}>
        <IconButton>
          <Badge badgeContent={cartCount} className={style.badge}>
            <ShoppingCartIcon onClick={toggleDrawer('right', true)} />
          </Badge>
        </IconButton>
        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>

        {/* </NavLink> */}
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
