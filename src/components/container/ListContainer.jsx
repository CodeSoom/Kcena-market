import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import List from '../presentational/List';

import { get } from '../../utils';

import {
  loadInitProducts,
} from '../../actions';

export default function ListContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitProducts());
  }, []);

  const products = useSelector(get('products'));

  return (
    <List products={products} />
  );
}
