import React from 'react';
import { Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

const pulse = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const AccessoriesInfoSection = styled(Box)`
  width: 100%;
  min-height: 700px;
  background-image: url('/accessoriesBcgr.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 60px;
  margin-bottom: 60px;

  @media (max-width: 1300px) {
    min-height: 600px;
    background-image: url('/accessoriesBcgr1300.jpg');
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    min-height: 600px;
    background-image: url('/accessoriesBcgr768.jpg');
    margin-bottom: 0;
  }
`;

const InfoText = styled.h2`
  color: #000000;
  font-family: 'montserrat', sans-serif;
  font-weight: 300;
  font-size: 35px;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-bottom: 20px;

  span {
    font-weight: 500;
  }

  @media (max-width: 1300px) {
    font-size: 25px;
    span {
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    font-size: 25px;
    span {
      font-weight: 500;
    }
  }
`;

const Logo = styled(Box)`
  width: 250px;
  height: 250px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  background-image: url('/logo2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 1300px) {
    width: 150px;
    height: 150px;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin-top: 30px;
  }
`;

const AnimatedLogo = styled(Logo)`
  animation-name: ${pulse};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const Link = styled(NavLink)`
  text-decoration: none;
`;

function AccessoriesInfo() {
  return (
    <Container maxWidth="lg">
      <AccessoriesInfoSection>
        <InfoText>
          <span>MobiStore</span> can also offer accessories for every taste!
        </InfoText>
        <Link to="/products/filter?categories=accessories">
          <ButtonDark label="See more" />
        </Link>
        <AnimatedLogo />
      </AccessoriesInfoSection>
    </Container>
  );
}

export default AccessoriesInfo;
