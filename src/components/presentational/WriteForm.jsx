import React from 'react';

import {
  TextField, Button,
} from '@material-ui/core';
import useStyles from '../../styles/styles';

export default function WriteForm({ newProduct, onChange, onSubmit }) {
  const {
    title, description, price, region,
  } = newProduct;
  const classes = useStyles();

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <div>
      <TextField
        type="text"
        label="글 제목"
        id="write-title"
        name="title"
        value={title}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        type="text"
        label="게시글 내용을 작성해주세요"
        id="write-description"
        name="description"
        value={description}
        onChange={handleChange}
        multiline
        rows={5}
        variant="outlined"
        fullWidth
      />

      <TextField
        type="number"
        label="상품 가격"
        id="write-price"
        name="price"
        value={price}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        type="text"
        label="판매 지역"
        id="write-region"
        name="region"
        value={region}
        onChange={handleChange}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        onClick={onSubmit}
        fullWidth
      >
        글쓰기
      </Button>
    </div>
  );
}
