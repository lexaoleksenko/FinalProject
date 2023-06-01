import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, useMediaQuery, Box } from '@mui/material';
import ProfileAvatar from '../../Ordinary/ProfileAvatar/ProfileAvatar';
import ProfileContacts from '../ProfileContacts/ProfileContacts';
import { logout } from '../../../redux/slices/authorization';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    navigate('/');
    window.location.reload();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('customer');
    return dispatch(logout());
  };

  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery('(max-width:570px)');

  return (
    <Grid
      container
      margin="8px 0px"
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      flexWrap="nowrap"
      spacing={1}
      paddingRight="8px"
    >
      <Grid item marginLeft="-8px">
        <Box
          backgroundColor="#ffffff"
          display="flex"
          flexDirection="column"
          sx={{
            borderRadius: '10px',
            padding: '20px 30px',
            paddingTop: '10px',
            height: '100%',
          }}
        >
          <ProfileAvatar handleClick={handleLogOut} />
        </Box>
      </Grid>
      <Grid item width="100%" style={{ paddingLeft: isMobile && '0px' }}>
        <Box
          backgroundColor="#ffffff"
          sx={{
            padding: '20px 30px',
            borderRadius: '10px',
            width: '100%',
            marginRight: '10px',
          }}
        >
          <ProfileContacts />
        </Box>
      </Grid>
    </Grid>
  );
}
