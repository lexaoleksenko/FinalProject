import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Select,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Stack,
} from '@mui/material';
import { toggleDrawer } from '../../../redux/slices/shopping-cart';

function DeliveryPaymentInfo() {
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          deliveryType: '',
          city: '',
          office: '',
          price: '',
          duration: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Delivery options</Typography>
            </Box>
            <RadioGroup
              name="deliveryType"
              value={values.deliveryType}
              onChange={handleChange}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label="Delivery to Home Address"
                />
                <Box
                  sx={{
                    pl: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '60%',
                  }}
                >
                  <Select
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ minWidth: '120px' }}
                  >
                    <MenuItem value="" disabled>
                      City
                    </MenuItem>
                    <MenuItem value="amsterdam">Amsterdam</MenuItem>
                    <MenuItem value="kiev">Kiev</MenuItem>
                    <MenuItem value="rotterdam">Rotterdam</MenuItem>
                  </Select>
                  <Select
                    name="office"
                    value={values.office}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ minWidth: '200px' }}
                  >
                    <MenuItem value="" disabled>
                      Delivery Office
                    </MenuItem>
                    <MenuItem value="office1">Office 1</MenuItem>
                    <MenuItem value="office2">Office 2</MenuItem>
                    <MenuItem value="office3">Office 3</MenuItem>
                  </Select>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">Price</Typography>
                    <Typography variant="subtitle1">5$</Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Delivery Duration
                    </Typography>
                    <Typography variant="subtitle1">3-4 days</Typography>
                  </Grid>
                </Box>
              </Box>

              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  value="pickup"
                  control={<Radio />}
                  label="Courier"
                />
                <Box
                  sx={{
                    pl: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '75%',
                  }}
                >
                  <Typography variant="subtitle2">
                    *Delivery only available in Kiev
                  </Typography>
                  <TextField
                    name="address"
                    label="address"
                    variant="outlined"
                  />
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">Price</Typography>
                    <Typography variant="subtitle1">5$</Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Delivery duration
                    </Typography>
                    <Typography variant="subtitle1">On the same day</Typography>
                  </Grid>
                </Box>
              </Box>
              <Box sx={{ mb: 2, mt: 4 }}>
                <Typography variant="h6">Payment</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  value="payment"
                  control={<Radio />}
                  label="Cash on delivery"
                />
              </Box>
            </RadioGroup>
          </Form>
        )}
      </Formik>
      <Stack style={{ padding: '200px 20px' }} direction="column" spacing={3}>
        <Button
          style={{ maxWidth: '450px', margin: '10px auto' }}
          size="large"
          variant="contained"
        >
          Save & continue
        </Button>
        <Button
          style={{ maxWidth: '450px', margin: '10px auto' }}
          size="large"
          variant="outlined"
          onClick={() => dispatch(toggleDrawer(true))}
        >
          Back to Cart
        </Button>
      </Stack>
    </>
  );
}

export default DeliveryPaymentInfo;
