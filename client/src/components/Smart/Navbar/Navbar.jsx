import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import style from './Navbar.module.scss';

import Logo from '../../Simple/Logo/Logo';
import NavLinks from '../../Simple/NavLinks/NavLinks';
import NavIcon from '../../Simple/NavIcon/NavIcon';

function Navbar() {
  return (
    <AppBar position="static" className={style.root}>
      <Toolbar>
        <Typography variant="h6" className={style}>
          <Logo />
        </Typography>
        <NavLinks />
        <NavIcon />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
