import { React } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import AvatarUser from '../../UI/Avatar/AvatapUser';
import { isAuthenticated } from '../../../helpers/authentication/authentication';

export default function PersonalAccount() {
  return (
    <Container maxWidth="lg">
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '600',
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        My Profile
      </Typography>
      <Box marginBottom="20px">
        <AvatarUser isAuth={isAuthenticated()} isProfil />
      </Box>
      <Box
        sx={{
          marginBottom: '45px',
          marginTop: '95px',
        }}
      >
        <ButtonDark label="save Data" />
      </Box>
    </Container>
  );
}
