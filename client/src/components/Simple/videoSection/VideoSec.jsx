import React from 'react';
import { Box, Container } from '@mui/material';
import styled from 'styled-components';

import InputWhite from '../../UI/InputWhite/InputWhite';

const VideoSecContainer = styled(Box)`
  min-width: 100%;
  height: 560px;
  background-color: #000000;
  overflow: hidden;
  text-align: center;
  padding-top: 60px;

  @media (max-width: 768px) {
    height: 460px;
  }
`;

const VideoSecTitle = styled.h3`
  color: #ffffff;
  font-family: 'montserrat', sans-serif;
  font-weight: 300;
  font-size: 35px;
  margin-top: 25px;
  margin-bottom: 15px;

  @media (max-width: 1300px) {
    font-size: 25px;
  }

  @media (max-width: 768px) {
    font-size: 25px;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const InputContainer = styled(Box)`
  width: 100%;
  position: relative;

  form {
    margin-top: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const VideoContainer = styled(Box)`
  width: 100%;
  height: 350px;

  video {
    width: 100%;
    height: 100%;
    margin-top: 70px;

    @media (max-width: 1300px) {
      margin-top: 90px;
    }

    @media (max-width: 768px) {
      margin-top: 140px;
    }
  }
`;

function VideoSec() {
  return (
    <VideoSecContainer>
      <Container maxWidth="lg">
        <VideoSecTitle>
          Leave your number and we will contact you!
        </VideoSecTitle>
        <InputContainer>
          <InputWhite label="Phone" />
        </InputContainer>
        <VideoContainer>
          <video src="./vid3.webm" autoPlay muted />
        </VideoContainer>
      </Container>
    </VideoSecContainer>
  );
}

export default VideoSec;
