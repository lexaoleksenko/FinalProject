import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';

const slideInfoUp = keyframes`
  0% {
    transform: translateY(40%);
  }
  100% {
    transform: translateY(0);
  }
`;

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

const MobiStoreContainer = styled(Box)`
  font-family: 'montserrat', sans-serif;
  width: 100%;
  height: 1200px;
  display: flex;
  background-color: #ffffff;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 700px;
  }
`;

const LeftSide = styled(Box)`
  width: 360px;
  height: 1200px;
  background-image: url('/Bcgr_L.jpg');
  background-position: center;
  background-repeat: no-repeat;
  margin-right: auto;
  margin-left: 0;
  background-color: #ffffff;
  animation: ${({ inview }) => (inview ? slideInLeft : 'none')} 4s ease-out;

  @media (max-width: 1300px) {
    background-image: none;
    background-color: #ffffff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSide = styled(Box)`
  width: 360px;
  height: 1200px;
  background-image: url('/Bcgr_R.jpg');
  background-position: center;
  background-repeat: no-repeat;
  margin-left: auto;
  margin-right: 0;
  animation: ${({ inview }) => (inview ? slideInRight : 'none')} 3s ease-out;

  @media (max-width: 1300px) {
    background-image: none;
    background-color: #ffffff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Info = styled(Box)`
  background-image: url('/mainBcgr.jpg');
  background-position: center;
  background-repeat: no-repeat;
  animation: ${({ inview }) => (inview ? slideInfoUp : 'none')} 3s ease-out;

  @media (max-width: 1300px) {
    background-image: url('/mainBcgr1300.jpg');
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    background-image: url('/mainBcgr768.jpg');
    display: flex;
    align-items: center;
    padding-top: 50px;
  }
`;

const InfoText = styled(Typography)`
  h2 {
    color: #000000;
    margin-left: 50px;
  }

  p {
    span {
      font-style: italic;
      font-weight: bold;
    }
  }

  @media (max-width: 1300px) {
    margin-top: -200px;
  }

  @media (max-width: 768px) {
    margin-top: -200px;

    h2 {
      font-size: 15px;
      margin-left: 0px;
    }

    p {
      font-size: 10px;
    }
  }
`;

function MobiStoreInfo() {
  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: true,
  });

  return (
    <MobiStoreContainer>
      <LeftSide inview={inView ? 1 : 0} />
      <Info
        ref={ref}
        inview={inView ? 1 : 0}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg" style={{ marginBottom: '300px' }}>
          <InfoText variant="div">
            <h2>MobiStore - dealer of your telephone delight!</h2>
            <p>
              Today, digital technologies continue to develop at an incredible
              pace and new products appear on the market every day that amaze us
              with their capabilities and functionality. One of the most
              in-demand devices are smartphones, which have long become an
              integral part of our lives.
            </p>
            <p>
              Smartphones, tablets, laptops and other electronic devices not
              only simplify our lives, but also are key tools for increasing our
              productivity. Each device has its own unique features and
              capabilities that have been developed by professionals in the
              field of science and technology.
            </p>
            <p>
              If you want to buy a new smartphone, then turn to the{' '}
              <span>MobiStore</span>, which offers a wide selection of devices
              with a warranty and the ability to test before buying. Trained
              specialists will help you make the right choice and provide
              qualified assistance.
            </p>
            <p>
              In addition, <span>MobiStore</span> provides services of a service
              center, where you can get warranty and non-warranty repair of your
              device in the shortest possible time. Our center cares about the
              quality of service and is ready to offer you a fast and efficient
              solution to problems with your device.
            </p>
            <p>
              So, do not postpone the purchase of a new device, turn to{' '}
              <span>MobiStore</span> and get not only a great product, but also
              professional support in using technologies!
            </p>
          </InfoText>
        </Container>
      </Info>
      <RightSide inview={inView ? 1 : 0} />
    </MobiStoreContainer>
  );
}

export default MobiStoreInfo;
