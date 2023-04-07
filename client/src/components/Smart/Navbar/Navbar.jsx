import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import style from './Navbar.module.scss';

import Logo from '../../UI/Logo/Logo';
import NavLinks from '../../Simple/NavLinks/NavLinks';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import InputNav from '../../Ordinary/InputNav/InputNav';

function Navbar() {
  return (
    <AppBar position="static" className={style.root}>
      <Toolbar>
        <Typography variant="h6" className={style}>
          <Logo />
        </Typography>
        <NavLinks />
        <InputNav />
        <NavIcon favCount={12} cartCount={8} nameAvatar="Artur Tech" />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
