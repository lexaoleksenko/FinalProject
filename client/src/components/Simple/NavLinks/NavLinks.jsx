import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonNav from '../../UI/Buttons/ButtonNav/ButtonNav';

import style from './NavLinks.module.scss';

function NavLinks() {
  return (
    <div className={style.root}>
      <NavLink to="/" className={style.link}>
        <ButtonNav label="Home" />
      </NavLink>
      <NavLink to="/card-list" className={style.link}>
        <ButtonNav label="All goods" />
      </NavLink>
      <NavLink to="/" className={style.link}>
        <ButtonNav label="About us" />
      </NavLink>
      <NavLink to="/" className={style.link}>
        <ButtonNav label="Contact" />
      </NavLink>
      <NavLink to="/checkout" className={style.link}>
        <ButtonNav label="CHECKOUT" />
      </NavLink>
    </div>
  );
}

export default NavLinks;
