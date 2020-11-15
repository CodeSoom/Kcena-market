import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  TextField, Button, Grid, InputAdornment,
} from '@material-ui/core';
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

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      region: '',
    },
    validationSchema,
    onSubmit: () => onSubmit({ newProduct: formik.values }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={3}
        className={classes.form}
      >
        <Grid item xs={12}>
          <TextField
            type="text"
            label="글 제목"
            id="write-title"
            name="title"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="상품 가격"
            id="write-price"
            name="price"
            required
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            fullWidth
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
          <TextField
            type="text"
            label="판매 지역"
            id="write-region"
            name="region"
            required
            value={formik.values.region}
            onChange={formik.handleChange}
            error={formik.touched.region && Boolean(formik.errors.region)}
            helperText={formik.touched.region && formik.errors.region}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            label="게시글 내용을 작성해주세요"
            id="write-description"
            name="description"
            required
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            multiline
            rows={8}
            variant="outlined"
            fullWidth
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
    </form>
  );
}
