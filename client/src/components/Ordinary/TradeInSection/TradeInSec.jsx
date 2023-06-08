import React from 'react';
import { Box, Container } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes } from 'styled-components';

const slideInLeft = keyframes`
  0% {
    transform: translateX(-40%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  0% {
    transform: translateX(40%);
  }
  100% {
    transform: translateX(0);
  }
`;

const TradeInSection = styled(Box)`
  font-family: 'montserrat', sans-serif;
  width: 100%;
  height: 300px;
  display: flex;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const LeftSide = styled(Box)`
  width: 360px;
  height: 300px;
  background-image: url('/TradeIn_L.jpg');
  background-position: center;
  background-repeat: no-repeat;
  margin-right: auto;
  margin-left: 0;
  background-color: #ffffff;
  animation: ${({ inview }) => (inview ? slideInLeft : 'none')} 4s ease-out;

  @media (max-width: 1300px) {
    background-image: url('/TradeIn_L1300.jpg');
  }

  @media (max-width: 768px) {
    background-image: url('/TradeIn_L768.jpg');
    height: 167px;
  }
`;

const RightSide = styled(Box)`
  width: 360px;
  height: 300px;
  background-image: url('/TradeIn_R.jpg');
  background-position: center;
  background-repeat: no-repeat;
  margin-left: auto;
  margin-right: 0;
  animation: ${({ inview }) => (inview ? slideInRight : 'none')} 3s ease-out;

  @media (max-width: 1300px) {
    background-image: url('/TradeIn_R1300.jpg');
  }

  @media (max-width: 768px) {
    background-image: url('/TradeIn_R768.jpg');
    height: 167px;
  }
`;

const InfoText = styled(Box)`
  h2 {
    font-weight: 400;
    text-align: center;
    color: #000000;
  }

  span {
    font-style: italic;
    font-weight: bold;
  }

  @media (max-width: 1300px) {
    h2 {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 13px;
    }
  }
`;

function TradeInSec() {
  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: true,
  });

  return (
    <TradeInSection>
      <LeftSide ref={ref} inview={inView ? 1 : 0} />
      <Container maxWidth="lg">
        <InfoText>
          <h2>
            In <span>MobiStore</span> you can use the <span>Trade-in</span>{' '}
            service and exchange your old gadget for a new one at favorable
            conditions!
          </h2>
        </InfoText>
      </Container>
      <RightSide inview={inView ? 1 : 0} />
    </TradeInSection>
  );
}

export default TradeInSec;
