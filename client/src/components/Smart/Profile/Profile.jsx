import { React } from 'react';
import { Container, Box } from '@mui/material';
import ProfileAvatar from '../../Ordinary/ProfileAvatar/ProfileAvatar';
import ProfileContacts from '../ProfileContacts/ProfileContacts';

export default function Profile() {
  return (
    <Container maxWidth="lg">
      <Box display="flex" margin="20px 0px">
        <Box
          backgroundColor="#ffffff"
          display="flex"
          sx={{
            flexWrap: 'wrap',
            alignItems: 'center',
            borderRadius: '10px',
          }}
        >
          <ProfileAvatar />
        </Box>
        <Box
          backgroundColor="#ffffff"
          sx={{
            width: '100%',
            marginLeft: '10px',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <ProfileContacts />
        </Box>
      </Box>
    </Container>
  );
}
