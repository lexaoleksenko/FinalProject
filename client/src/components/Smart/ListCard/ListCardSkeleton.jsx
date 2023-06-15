import React from 'react';
import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

function ListCardSkeleton() {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      {' '}
      <Box
        style={{
          padding: '15px',
          height: '420px',
          backgroundColor: '#ffffff',
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        <Box style={{ display: 'flex' }}>
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 'auto',
              marginRight: '0',
            }}
          />
        </Box>
        <Box style={{ display: 'flex' }}>
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{ marginTop: 5, marginBottom: 5 }}
          />{' '}
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 'auto',
              marginRight: '0',
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
}

export default ListCardSkeleton;
