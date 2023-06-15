import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes } from 'styled-components';

import ButtonWhite from '../../UI/Buttons/ButtonWhite/ButtonWhite';

const crawl = keyframes`
  0% {
    transform: translateY(100%) scale(2);
  }
  100% {
    transform: translateY(0) scale(1);
  }
`;

const SpecialOfferSection = styled.div`
  padding-top: 60px;
  min-width: 100%;
  height: 620px;
  background-color: #000000;
  overflow: hidden;
  text-align: center;
`;

const Title = styled.h2`
  color: #ffffff;
  font-family: 'montserrat', sans-serif;
  font-weight: 300;
  font-size: 25px;
  margin-top: 5px;
  margin-bottom: 0px;
`;

const Subtitle = styled.h3`
  color: #ffffff;
  font-family: 'montserrat', sans-serif;
  font-weight: 300;
  font-size: 35px;
  margin-top: 5px;
  margin-bottom: 15px;

  span {
    font-weight: 500;
  }

  @media (max-width: 1300px) {
    font-size: 25px;
  }
`;

const SpecialBackground = styled(Box)`
  width: 100%;
  height: 320px;
  background-image: url('/specialBcgr.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 10px;
  padding-bottom: 60px;
  animation: ${({ inview }) => (inview ? crawl : 'none')} 2s linear;

  @media (max-width: 1300px) {
    background-image: url('/specialBcgr1300.jpg');
  }

  @media (max-width: 768px) {
    height: 220px;
    background-image: url('/specialBcgr768.jpg');
  }
`;

function SpecialOfferSec() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <SpecialOfferSection ref={ref}>
      <Container maxWidth="lg">
        <Title>Special for You!</Title>
        <Subtitle>
          iPhone 14 Pro is now available in the{' '}
          <Typography
            variant="span"
            style={{ fontWeight: '500', fontSize: '35px' }}
          >
            MobiStore
          </Typography>
          !
        </Subtitle>
        <NavLink to="/products/303125">
          <ButtonWhite label="Buy Now" />
        </NavLink>
        <SpecialBackground inview={inView ? 1 : 0} />
      </Container>
    </SpecialOfferSection>
  );
}

export default SpecialOfferSec;
