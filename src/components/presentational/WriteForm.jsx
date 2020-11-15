import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import {
  Button, Grid, InputAdornment,
} from '@material-ui/core';
import FormikField from './FormikField';

import useStyles from '../../styles/styles';

const validationSchema = yup.object({
  title: yup
    .string()
    .required('필수 항목입니다.'),
  description: yup
    .string()
    .required('필수 항목입니다.'),
  price: yup
    .string()
    .required('필수 항목입니다.'),
  region: yup
    .string()
    .required('필수 항목입니다'),
});

export default function WriteForm({ onSubmit }) {
  const classes = useStyles();

  function handleSubmit(values) {
    onSubmit({ newProduct: values });
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        price: 0,
        region: '',
      }}
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
                  label="글 제목"
                  id="write-title"
                  name="title"
                  error={touched.title && Boolean(errors.title)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  type="number"
                  label="상품 가격"
                  id="write-price"
                  name="price"
                  error={touched.description && Boolean(errors.description)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        ￦
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  label="판매 지역"
                  id="write-region"
                  name="region"
                  error={touched.region && Boolean(errors.region)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikField
                  label="게시글 내용을 작성해주세요"
                  id="write-description"
                  name="description"
                  error={touched.description && Boolean(errors.description)}
                  multiline
                  rows={8}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  글쓰기
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
}
