import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';

const CardWrapper = styled(Card)`
  display: flex;
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 1300px) {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;
const CardInfo = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  margin-left: 15px;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const CardButtons = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
function MainCardSkeleton() {
  return (
    <CardWrapper>
      <Skeleton
        variant="rounded"
        style={{ marginTop: 5, marginBottom: 5, width: '100%', height: '100%' }}
      />
      <CardInfo>
        <Skeleton variant="text" width="70%" height="70px" />
        <Skeleton
          variant="text"
          width="30%"
          height="70px"
          style={{ marginTop: 5 }}
        />
        <Skeleton
          variant="text"
          width="30%"
          height="70px"
          style={{ marginTop: 5 }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height="250px"
          style={{ marginTop: -15 }}
        />
        <CardButtons>
          <Skeleton
            variant="text"
            width="40%"
            height="100px"
            style={{ marginLeft: 15, marginRight: 'auto' }}
          />
          <Skeleton
            variant="text"
            width="8%"
            height="70px"
            style={{ marginLeft: 'auto', marginRight: 15 }}
          />
        </CardButtons>
      </CardInfo>
    </CardWrapper>
  );
}

export default MainCardSkeleton;
