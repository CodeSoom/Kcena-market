import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import List from '../presentational/List';

import { get } from '../../utils';

import {
  loadInitItems,
} from '../../actions';

export default function ListContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitItems());
  }, []);

  const items = useSelector(get('items'));

  return (
    <List items={items} />
  );
}
