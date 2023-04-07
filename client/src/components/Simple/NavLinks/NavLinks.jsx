import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './NavLinks.module.scss';

function NavLinks() {
  return (
    <div className={style.root}>
      <NavLink to="/" className={style.link}>
        Home
      </NavLink>
      <NavLink to="/" className={style.link}>
        All goods
      </NavLink>
      <NavLink to="/" className={style.link}>
        About Us
      </NavLink>
      <NavLink to="/" className={style.link}>
        Contact
      </NavLink>
    </div>
  );
}

export default NavLinks;
