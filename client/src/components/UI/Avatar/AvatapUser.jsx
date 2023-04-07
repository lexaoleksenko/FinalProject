import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

function AvatarUser({ nameAvatar, avatarSrc }) {
  const firstLetter = nameAvatar.charAt(0).toUpperCase();

  return (
    <Avatar sx={{ width: 56, height: 56 }} src={avatarSrc}>
      {firstLetter}
    </Avatar>
  );
}

AvatarUser.defaultProps = {
  avatarSrc: '#',
  nameAvatar: 'Jhon Dou',
};

AvatarUser.propTypes = {
  nameAvatar: PropTypes.string,
  avatarSrc: PropTypes.string,
};

export default AvatarUser;
