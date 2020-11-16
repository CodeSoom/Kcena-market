import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

import AccountCircle from '@material-ui/icons/AccountCircle';
import LockRounded from '@material-ui/icons/LockRounded';

import FormikField from './FormikField';

import useStyles from '../../styles/styles';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string()
    .email('잘못된 이메일 형식입니다.')
    .required('필수 항목입니다.'),
  password: yup.string()
    .required('필수 항목입니다.')
    .min(6, '비밀번호는 최소 6자리의 숫자/문자 조합이어야 합니다.')
    .matches(/(?=.*[0-9])/, '비밀번호에는 숫자가 포함되어야 합니다.'),
});

export default function LoginForm({ onSubmit, onGoogleSignIn }) {
  const classes = useStyles();

  function handleSubmit(values) {
    onSubmit({ loginFields: values });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {
        ({ touched, errors }) => (
          <Form>
            <Grid
              container
              spacing={3}
              className={classes.form}
            >
              <Grid item xs={12}>
                <FormikField
                  type="email"
                  label="email"
                  id="email"
                  name="email"
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikField
                  type="password"
                  label="password"
                  id="password"
                  name="password"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRounded />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={onGoogleSignIn}
                >
                  Sign in with Google
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
}
