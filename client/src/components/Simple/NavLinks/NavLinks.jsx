import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';

import ButtonNav from '../../UI/Buttons/ButtonNav/ButtonNav';
import InputNav from '../../UI/InputWhite/InputWhite';
import NavIcon from '../NavIcon/NavIcon';

import style from './NavLinks.module.scss';

function NavLinks({
  cartCount,
  favCount,
  nameAvatar,
  isAuth,
  onClickLogOut,
  onClickOpenDrawer,
}) {
  const isMobile = useMediaQuery('(max-width:768px)');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={style.mainRoot}>
      {!isMobile ? (
        <div className={style.root}>
          <NavLink to="/" className={style.link}>
            <ButtonNav label="Home" />
          </NavLink>
          <NavLink to="/products" className={style.link}>
            <ButtonNav label="All goods" />
          </NavLink>
          <NavLink to="/about-us">
            <ButtonNav label="About us" />
          </NavLink>
          <NavLink to="/" className={style.link}>
            <ButtonNav label="Contact" />
          </NavLink>
        </div>
      ) : (
        <div className={style.rootMob}>
          <IconButton onClick={handleOpen}>
            <MenuIcon style={{ color: '#ffffff', fontSize: 50 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              style: {
                width: 300,
                backgroundColor: '#000000',
                border: '1px solid #ffffff',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <NavLink to="/" className={style.link}>
                <ButtonNav label="Home" />
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink to="/products" className={style.link}>
                <ButtonNav label="All goods" />
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink to="/" className={style.link}>
                <ButtonNav label="About us" />
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose} style={{ marginBottom: 20 }}>
              <NavLink to="/" className={style.link}>
                <ButtonNav label="Contact" />
              </NavLink>
            </MenuItem>
            <MenuItem style={{ marginBottom: 20 }}>
              <InputNav />
            </MenuItem>
            <MenuItem onClick={handleClose} style={{ marginBottom: 20 }}>
              <NavIcon
                favCount={favCount}
                cartCount={cartCount}
                nameAvatar={nameAvatar}
                isAuth={isAuth}
                onClickLogOut={onClickLogOut}
                onClickOpenDrawer={onClickOpenDrawer}
              />
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}

NavLinks.defaultProps = {
  onClickLogOut: null,
  onClickOpenDrawer: null,
  cartCount: 666,
  favCount: 999,
  nameAvatar: 'Jhon Dou',
  isAuth: false,
};

NavLinks.propTypes = {
  cartCount: PropTypes.number,
  favCount: PropTypes.number,
  nameAvatar: PropTypes.string,
  isAuth: PropTypes.bool,
  onClickLogOut: PropTypes.func,
  onClickOpenDrawer: PropTypes.func,
};

export default NavLinks;
