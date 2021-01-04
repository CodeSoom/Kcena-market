import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import {
  Button, Grid, InputAdornment,
} from '@material-ui/core';

import FormikField from './FormikField';
import FormikSelect from './FormikSelect';

import useStyles from '../../styles/styles';

const validationSchema = yup.object({
  title: yup
    .string()
    .required('필수 항목입니다.'),
  category: yup
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

const initialValues = {
  title: '',
  category: '',
  description: '',
  price: '',
  region: '',
};

const categories = [
  {
    label: '디지털/가전',
    value: '디지털/가전',
  },
  {
    label: '가구/인테리어',
    value: '가구/인테리어',
  },
  {
    label: '남성패션/잡화',
    value: '남성패션/잡화',
  },
  {
    label: '여성의류',
    value: '여성의류',
  },
  {
    label: '생활/가공식품',
    value: '생활/가공식품',
  },
  {
    label: '스포츠/레저',
    value: '스포츠/레저',
  },
  {
    label: '기타 중고물품',
    value: '기타 중고물품',
  },
];

export default function WriteForm({
  onSubmit, initialEditProduct,
}) {
  const classes = useStyles();

  function handleSubmit(product) {
    onSubmit({ newProduct: product });
  }

  return (
    <Formik
      initialValues={initialEditProduct || initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {
        ({ touched, errors }) => (
          <Form>
            <Grid
              container
              spacing={3}
              className={classes.form}
            >
              <Grid item xs={6}>
                <FormikField
                  label="글 제목"
                  id="write-title"
                  name="title"
                  error={touched.title && Boolean(errors.title)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikSelect
                  label="카테고리"
                  id="product-category"
                  items={categories}
                  name="category"
                  error={touched.category && Boolean(errors.category)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  type="number"
                  label="상품 가격"
                  id="write-price"
                  name="price"
                  error={touched.price && Boolean(errors.price)}
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
                  color={initialEditProduct ? 'primary' : 'default'}
                  fullWidth
                >
                  {initialEditProduct ? '수정하기' : '글쓰기'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
}
