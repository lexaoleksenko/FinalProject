/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { Box, Grid, TextField, Rating, FormHelperText } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../../helpers/authentication/authentication';

import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import {
  addNewCommentProduct,
  fetchProductComments,
} from '../../../redux/slices/commenting';

function CommentsForm({ toggleModal, prodId }) {
  const dispatch = useDispatch();

  // Authenticated Logic
  const isAuth = isAuthenticated();

  // logic disabled Button
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const handleNewData = values => {
    setIsDisabledButton(true);
    const commentsDataObj = { ...values };
    const commentsDataStr = Object.entries(commentsDataObj)
      .map(([key, value]) => `${key}:${value}`)
      .join(',');

    const fetchNewCommentData = {
      product: prodId,
      content: commentsDataStr,
    };
    if (fetchNewCommentData) {
      dispatch(addNewCommentProduct(fetchNewCommentData));
      dispatch(fetchProductComments);
      toggleModal();
    }
  };

  return (
    <Formik
      onSubmit={handleNewData}
      initialValues={{
        advantages: '',
        flaws: '',
        comment: '',
        rating: '',
      }}
      validationSchema={Yup.object({
        advantages: Yup.string()
          .matches(/^[A-Za-z0-9 ,.!?]*$/, 'Please enter valid advantages')
          .required('Advantages is required*'),
        flaws: Yup.string()
          .matches(/^[A-Za-z0-9 ,.!?]*$/, 'Please enter valid flaws')
          .required('Flaws is required*'),
        comment: Yup.string()
          .matches(/^[A-Za-z0-9 ,.!?]*$/, 'Please enter valid comment')
          .required('Comment is required*'),
        rating: Yup.number().required('Rating is required*'),
      })}
    >
      {({ isValid, values }) => {
        useEffect(() => {
          if (isValid) {
            setIsDisabledButton(false);
          }
          if (!isValid) {
            setIsDisabledButton(true);
          }
        }, [values, isValid]);
        return (
          <Form>
            <Grid
              container
              padding="40px"
              direction="column"
              sx={{
                backgroundColor: '#ffffff',
                minWidth: '500px',
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ marginBottom: '20px' }}
                position="relative"
              >
                <Field type="rating" id="rating" name="rating" as={Rating}>
                  {({ field, meta }) => (
                    <>
                      <Rating
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      {meta.touched && meta.error && (
                        <FormHelperText
                          error
                          sx={{
                            position: 'absolute',
                            bottom: '-20px',
                            fontSize: '13px',
                            left: '15px',
                          }}
                        >
                          {meta.error}
                        </FormHelperText>
                      )}
                    </>
                  )}
                </Field>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginBottom: '20px' }}
                position="relative"
              >
                <Field type="text" id="advantages" name="advantages">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Advantages:"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        style: {
                          position: 'absolute',
                          bottom: '-20px',
                          fontSize: '13px',
                        },
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginBottom: '20px' }}
                position="relative"
              >
                <Field type="text" id="flaws" name="flaws">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Flaws:"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        style: {
                          position: 'absolute',
                          bottom: '-20px',
                          fontSize: '13px',
                        },
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginBottom: '20px' }}
                position="relative"
              >
                <Field type="text" id="comment" name="comment">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      sx={{
                        '& input': {
                          height: '200px',
                        },
                      }}
                      multiline
                      rows={5}
                      label="Comment:"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        style: {
                          position: 'absolute',
                          bottom: '-20px',
                          fontSize: '13px',
                        },
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: '30px',
                }}
              >
                <ButtonDark
                  label="Leave a Comment"
                  type="submit"
                  style={{ width: '250px', marginBottom: '15px' }}
                  disabled={isDisabledButton}
                />
                <ButtonDark
                  label="Close"
                  type="button"
                  style={{ width: '150px' }}
                  onClick={toggleModal}
                />
              </Box>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

CommentsForm.defaultProps = {
  toggleModal: null,
  prodId: null,
};

CommentsForm.propTypes = {
  toggleModal: PropTypes.func,
  prodId: PropTypes.string,
};

export default CommentsForm;
