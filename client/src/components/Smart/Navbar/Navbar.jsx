import { React, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/auth';

import style from './Navbar.module.scss';

import Logo from '../../UI/Logo/Logo';
import NavLinks from '../../Simple/NavLinks/NavLinks';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import InputNav from '../../UI/InputWhite/InputWhite';

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

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
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
