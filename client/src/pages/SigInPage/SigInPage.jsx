import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import styles from './SigInPage.module.scss';

function SigInPage() {
  const isAuth = false;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.sigInBcgr}>
      <Paper className={styles.sigInPage}>
        <Typography className={styles.title} variant="h5">
          Create an account
        </Typography>
        <form onSubmit={handleSubmit()}>
          <div className={styles.avatar}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>
          <TextField
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'Enter Name' })}
            type="name"
            className={styles.field}
            label="Fuul name"
            fullWidth
          />
          <TextField
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            {...register('email', { required: 'Enter e-mail' })}
            className={styles.field}
            label="E-Mail"
            fullWidth
          />
          <TextField
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            type="password"
            {...register('password', { required: 'Enter password!' })}
            className={styles.field}
            label="Password"
            fullWidth
          />
          <Button
            disabled={!isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            SiG IN
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SigInPage;
