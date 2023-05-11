import React, { useState } from 'react';

import { Tab, Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FormContacts from '../../components/Simple/FormCheckoutPage/FormContacts';
import style from './CheckoutPage.module.scss';
import ProductOrderInfo from '../../components/Simple/ProductOrderInfo/ProductOrderInfo';

export default function CheckoutPage() {
  const [value, setValue] = useState('1');

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <TabContext value={value}>
        <TabList
          className={style.list}
          onChange={handleTabs}
          variant="fullWidth"
          centered
        >
          <Tab className={style.item} label="Contacts" value="1" />
          <Tab className={style.item} label="Delivery & Payment" value="2" />
          <Tab className={style.item} label="Order Review" value="3" />
        </TabList>
        <TabPanel value="1">
          <FormContacts
            handelContinue={() => {
              setValue('2');
            }}
          />
        </TabPanel>
        <TabPanel value="2">Delivery &#38; Payment</TabPanel>
        <TabPanel value="3">
          <ProductOrderInfo />
        </TabPanel>
      </TabContext>
    </Container>
  );
}
