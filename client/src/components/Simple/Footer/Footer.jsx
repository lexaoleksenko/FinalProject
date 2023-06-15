import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/material';
import styled from 'styled-components';

import Logo from '../../UI/Logo/Logo';

const FooterContainer = styled(Box)`
  height: 200px;
  background-color: #000000;
  display: flex;
  position: relative;
  margin-top: auto;
  margin-bottom: 0px;

  @media (max-width: 768px) {
    background-color: #000000;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const LogoContainer = styled(Box)`
  width: 150px;
  height: 150px;
  margin-top: auto;
  margin-bottom: auto;
`;

const TextContainer = styled(Box)`
  width: 1000px;
  margin: auto;
  color: #ffffff;
  font-family: 'montserrat', sans-serif;
  font-weight: 100;
  font-size: 20px;

  p {
    span {
      font-weight: 300;
    }
  }

  @media (max-width: 1300px) {
    font-size: 10px;
  }

  @media (max-width: 768px) {
    width: 300px;
    text-align: center;
    font-size: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const IconsContainer = styled(Box)`
  margin-left: auto;
  margin-right: 30px;
  margin-top: auto;
  margin-bottom: auto;

  @media (max-width: 1300px) {
    margin-left: auto;
    margin-right: 5px;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;

    & svg {
      width: 30px;
    }
  }

  @media (max-width: 768px) {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      width: 30px;
    }
  }
`;

const AddressContainer = styled(Box)`
  font-family: 'montserrat', sans-serif;
  color: #ffffff;
  margin-right: 20px;
  margin-top: auto;
  margin-bottom: auto;

  p {
    margin-bottom: 0px;
    margin-top: 5px;
  }

  @media (max-width: 1300px) {
    font-family: 'montserrat', sans-serif;
    font-size: 10px;
    color: #ffffff;
    margin-right: 5px;
    margin-top: auto;
    margin-bottom: auto;
    width: 400px;

    p {
      margin-bottom: 0px;
      margin-top: 5px;
    }
  }

  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <TextContainer>
        <p>
          <span>MobiStore.ua</span> is an online store of MobiStore, a Ukrainian
          chain of stores for smartphones and related products. For any
          questions, contact us by phone <span>+380 44 *** 4567</span>{' '}
          (Toll-free) or by e-mail at <span>info@MobiStore.ua</span>. We are
          always glad to see you in our stores.
        </p>
      </TextContainer>
      <IconsContainer>
        <InstagramIcon
          color="secondary"
          style={{ fontSize: 50, marginRight: 25 }}
        />
        <TelegramIcon
          color="secondary"
          style={{ fontSize: 50, marginRight: 25 }}
        />
        <YouTubeIcon
          color="secondary"
          style={{ fontSize: 50, marginRight: 25 }}
        />
        <EmailIcon color="secondary" style={{ fontSize: 50 }} />
      </IconsContainer>
      <AddressContainer>
        <p>Kyiv, Ukraine</p>
        <p>Vasyl Pupkin St. 10/1</p>
        <p>Work hours: 9:00am - 9:00pm</p>
        <p>© 2022–2023 MobiStore</p>
      </AddressContainer>
    </FooterContainer>
  );
}

export default Footer;
