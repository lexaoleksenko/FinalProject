import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import style from './Navbar.module.scss';

import Logo from '../../UI/Logo/Logo';
import NavLinks from '../../Simple/NavLinks/NavLinks';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import InputNav from '../../UI/InputWhite/InputWhite';

function Navbar() {
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
          isAuth={false}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
