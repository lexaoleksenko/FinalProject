import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, IconButton, Menu, MenuItem, Box } from '@mui/material';

import ButtonNav from '../../UI/Buttons/ButtonNav/ButtonNav';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import MobileModalSearch from '../../MultiComponentsIC/MobileModalSearch/MobileModalSearch';

const NavLinksContainer = styled(Box)`
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: 0;
  }
`;

const NavLinkComponent = styled(NavLink)`
  text-decoration: none;
  width: 100%;

  @media (max-width: 1300px) {
    padding: 0;
    margin: 0;
  }
`;

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
    <NavLinksContainer>
      {!isMobile ? (
        <Box style={{ display: 'flex' }}>
          <NavLinkComponent to="/">
            <ButtonNav label="Home" />
          </NavLinkComponent>
          <NavLinkComponent to="/products/filter?">
            <ButtonNav label="All goods" />
          </NavLinkComponent>
          <NavLinkComponent to="/about-us">
            <ButtonNav label="About us" />
          </NavLinkComponent>
          <NavLinkComponent to="/contact">
            <ButtonNav label="Contact" />
          </NavLinkComponent>
        </Box>
      ) : (
        <Box style={{ marginLeft: 'auto', marginRight: '20px' }}>
          <MobileModalSearch />
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
            <MenuItem style={{ marginLeft: '25px' }} onClick={handleClose}>
              <NavLinkComponent to="/">
                <ButtonNav
                  label="Home"
                  style={{
                    width: 100,
                  }}
                />
              </NavLinkComponent>
            </MenuItem>
            <MenuItem style={{ marginLeft: '25px' }} onClick={handleClose}>
              <NavLinkComponent to="/products">
                <ButtonNav label="All goods" />
              </NavLinkComponent>
            </MenuItem>
            <MenuItem style={{ marginLeft: '25px' }} onClick={handleClose}>
              <NavLinkComponent to="/about-us">
                <ButtonNav label="About us" />
              </NavLinkComponent>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              style={{ marginBottom: 20, marginLeft: '25px' }}
            >
              <NavLinkComponent to="/contact">
                <ButtonNav label="Contact" />
              </NavLinkComponent>
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
        </Box>
      )}
    </NavLinksContainer>
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
