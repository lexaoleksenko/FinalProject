import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './LogInpage.module.scss';

function LogInPage() {
  const isAuth = false;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  console.log(isAuth);

  return (
    <div className={styles.logInBcgr}>
      <Paper className={styles.logInPage}>
        <Typography
          className={styles.title}
          style={{ marginBottom: 30 }}
          variant="p"
        >
          Account login
        </Typography>
        <form onSubmit={handleSubmit()}>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Enter your email' })}
            fullWidth
          />
          <TextField
            className={styles.field}
            label="Password"
            fullWidth
            error={Boolean(errors.email?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Enter your password' })}
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            disabled={!isValid}
          >
            Log In
          </Button>
        </form>
        <NavLink to="/sigin">
          <Button type="button" size="small" variant="contained">
            Sig In
          </Button>
        </NavLink>
      </Paper>
    </div>
  );
}

export default LogInPage;
