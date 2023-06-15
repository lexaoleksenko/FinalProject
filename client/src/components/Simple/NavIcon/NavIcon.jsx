import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge, Box } from '@mui/material';
import styled from 'styled-components';

import AvatarUser from '../../UI/Avatar/AvatapUser';

const NavIconContainer = styled(Box)`
  margin-right: 20px;
  margin-left: 20px;
  display: flex;

  @media (max-width: 940px) {
    margin-right: 2px;
    margin-left: 2px;
  }

  @media (max-width: 768px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

const IconLink = styled(NavLink)`
  margin-right: 10px;
  width: 35px;
  height: 35px;
  text-decoration: none;
`;

const Icon = styled(IconButton)`
  width: 25px;
  height: 35px;
  color: #ffffff;
`;

const BadgeContainer = styled(Badge)`
  color: white;
`;

const AvatarContainer = styled(Box)`
  margin-top: auto;
  margin-bottom: auto;
`;

const IconContainer = styled(Box)`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  display: flex;

  @media (max-width: 940px) {
    margin-right: 2px;
    display: flex;
    flex-direction: column;
  }
`;

function NavIcon({
  cartCount,
  favCount,
  nameAvatar,
  avatarSrc,
  isAuth,
  onClickLogOut,
  onClickOpenDrawer,
}) {
  return (
    <NavIconContainer>
      <IconContainer>
        <IconLink>
          <Icon onClick={onClickOpenDrawer}>
            <BadgeContainer badgeContent={cartCount}>
              <ShoppingCartIcon onClick={onClickOpenDrawer} />
            </BadgeContainer>
          </Icon>
        </IconLink>
        <IconLink to="/wishlist">
          <Icon>
            <BadgeContainer badgeContent={favCount}>
              <FavoriteIcon />
            </BadgeContainer>
          </Icon>
        </IconLink>
      </IconContainer>
      <AvatarContainer>
        <IconLink to={isAuth ? '/personal-account' : '/login'}>
          <AvatarUser
            nameAvatar={nameAvatar}
            avatarSrc={avatarSrc}
            isAuth={isAuth}
            onClickLogOut={onClickLogOut}
          />
        </IconLink>
      </AvatarContainer>
    </NavIconContainer>
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
  onClickLogOut: PropTypes.func.isRequired,
  onClickOpenDrawer: PropTypes.func.isRequired,
};

export default NavIcon;
