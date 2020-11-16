import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

import AccountCircle from '@material-ui/icons/AccountCircle';
import LockRounded from '@material-ui/icons/LockRounded';

import FormikField from './FormikField';
import TextError from './TextError';

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

export default function SignupForm({ onSubmit, signupError }) {
  const classes = useStyles();

  function handleSubmit(values) {
    onSubmit({ signupFields: values });
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
                  label="E-mail"
                  id="signup-email"
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
                  label="Password"
                  id="signup-password"
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
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={12}>
                {signupError && <TextError>{signupError}</TextError>}
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
}
