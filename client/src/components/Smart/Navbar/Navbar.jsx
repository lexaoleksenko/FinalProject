import { React, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/auth';
import { toggleDrawer, stateDrawer } from '../../../redux/slices/shopping-cart';

import style from './Navbar.module.scss';

import Logo from '../../UI/Logo/Logo';
import NavLinks from '../../Simple/NavLinks/NavLinks';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import InputNav from '../../UI/InputWhite/InputWhite';
import CartList from '../CartList/CartList';

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const stateDraw = useSelector(stateDrawer);

  const handleLogOut = () => {
    window.localStorage.removeItem('token');
    setIsAuth(false);
    return dispatch(logout());
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return setIsAuth(false);
    }
    if (token) {
      setIsAuth(true);
    }
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    dispatch(toggleDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(toggleDrawer(false));
  };

  return (
    <AppBar position="static" className={style.root}>
      <Toolbar>
        <Typography variant="h6" className={style}>
          <Logo />
        </Typography>
        <NavLinks />
        <InputNav />
        <NavIcon
          favCount={12}
          cartCount={8}
          nameAvatar="Artur Tech"
          isAuth={isAuth}
          onClickLogOut={handleLogOut}
          onClickOpenDrawer={handleDrawerOpen}
        />
        <Drawer anchor="right" open={stateDraw} onClose={handleDrawerClose}>
          <CartList onClickClose={handleDrawerClose} />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
