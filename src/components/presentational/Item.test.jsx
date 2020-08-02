import React from 'react';

import { render } from '@testing-library/react';

import Item from './Item';

import items from '../../../fixtures/items';

describe('Item', () => {
  it('renders item', () => {
    const ITEM = items[0];

    const { title, region, price } = ITEM;

    const { container } = render((
      <Item item={ITEM} />
    ));

    expect(container).toHaveTextContent(title);
    expect(container).toHaveTextContent(region);
    expect(container).toHaveTextContent(price);
  });
});
