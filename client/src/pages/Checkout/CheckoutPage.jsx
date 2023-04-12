import React, { useState } from 'react';
import { Tab, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-unresolved,import/no-extraneous-dependencies
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FormContacts from '../../components/Simple/FormCheckoutPage/FormContacts';
import style from './CheckoutPage.module.scss';

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
      <TabPanel value="3">Order Review</TabPanel>
    </TabContext>
  );
}
