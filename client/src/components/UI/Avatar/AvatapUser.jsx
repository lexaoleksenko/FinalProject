import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@mui/material';

function AvatarUser({ nameAvatar, avatarSrc, isAuth }) {
  const firstLetter = nameAvatar.charAt(0).toUpperCase();

  return isAuth ? (
    <Avatar sx={{ width: 56, height: 56 }} src={avatarSrc}>
      {firstLetter}
    </Avatar>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      style={{
        borderRadius: 2,
        fontFamily: 'montserrat',
      }}
    >
      Log in
    </Button>
  );
}

AvatarUser.defaultProps = {
  avatarSrc: '#',
  nameAvatar: 'Jhon Dou',
  isAuth: false,
};

AvatarUser.propTypes = {
  nameAvatar: PropTypes.string,
  avatarSrc: PropTypes.string,
  isAuth: PropTypes.bool,
};

export default AvatarUser;
