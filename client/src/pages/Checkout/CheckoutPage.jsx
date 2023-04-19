import React, { useState } from 'react';
import { Button, Stack, Tab, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-unresolved,import/no-extraneous-dependencies
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FormContacts from '../../components/Simple/FormCheckoutPage/FormContacts';
import style from './CheckoutPage.module.scss';
import ProductOrderInfo from '../../components/Simple/ProductOderInfo/ProductOrderInfo';

export default function CheckoutPage() {
  const [value, setValue] = useState('1');

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList className={style.list} onChange={handleTabs} variant="fullWidth">
        <Tab className={style.item} label="Contacts" value="1" />
        <Tab className={style.item} label="Delivery & Payment" value="2" />
        <Tab className={style.item} label="Order Review" value="3" />
      </TabList>
      <TabPanel value="1">
        <Typography className={style.title} variant="h5">
          Main Information
        </Typography>
        <FormContacts />
      </TabPanel>
      <TabPanel value="2">Delivery &#38; Payment</TabPanel>
      <TabPanel value="3">
        <ProductOrderInfo />
        <Stack style={{ padding: '30px 10px' }} direction="column" spacing={3}>
          <Button
            style={{ maxWidth: '450px', margin: '10px auto' }}
            size="large"
            variant="contained"
          >
            Confirm order
          </Button>
          <Button
            style={{ maxWidth: '450px', margin: '10px auto' }}
            size="large"
            variant="outlined"
          >
            Back to Cart
          </Button>
        </Stack>
      </TabPanel>
    </TabContext>
  );
}
