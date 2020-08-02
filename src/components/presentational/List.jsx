import React from 'react';
import Item from './Item';

import { CardList } from '../../styles/Card';

export default function List({ items }) {
  if (!(items || []).length) {
    return (
      <p>품목이 없습니다!</p>
    );
  }

  return (
    <CardList>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </CardList>
  );
}
