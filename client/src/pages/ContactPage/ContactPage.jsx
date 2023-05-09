import { React } from 'react';

import { Container, Grid } from '@mui/material';
import Map from '../../components/Simple/Map/Map';
import style from './ContactPage.module.scss';

function ContactPage() {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={1}
        display="flex"
        justifyContent="space-between"
        marginTop="100px"
        style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
        padding="50px"
      >
        <Grid item className={style.info} textAlign="center" width="400px">
          <p>
            <span>City: </span>Kyiv, Ukraine
          </p>
          <p>
            <span>Address: </span>Vasyl Pupkin St. 10/1
          </p>
          <p>
            <span>Work hours: </span> 9:00am - 9:00pm
          </p>
          <p>
            <span>Email: </span>info@MobiStore.ua
          </p>
          <p>
            <span>Contact number: </span>+380 44 *** 4567{' '}
          </p>
          <p>
            <span>©2022–2023 MobiStore</span>
          </p>
        </Grid>
        <Grid item className={style.mapWrapp} textAlign="center">
          <Map />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;
