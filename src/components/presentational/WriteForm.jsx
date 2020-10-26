import React from 'react';

import {
  TextField, Button, Grid, InputAdornment,
} from '@material-ui/core';

export default function WriteForm({ newProduct, onChange, onSubmit }) {
  const {
    title, description, price, region,
  } = newProduct;

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          type="text"
          label="글 제목"
          id="write-title"
          name="title"
          value={title}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="상품 가격"
          id="write-price"
          name="price"
          value={price}
          onChange={handleChange}
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
          value={region}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          label="게시글 내용을 작성해주세요"
          id="write-description"
          name="description"
          value={description}
          onChange={handleChange}
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
          onClick={onSubmit}
          fullWidth
        >
          글쓰기
        </Button>

      </Grid>
    </Grid>
  );
}
