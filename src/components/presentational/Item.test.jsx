import React from 'react';

import { render } from '@testing-library/react';

import Item from './Item';

import items from '../../../fixtures/items';

describe('Item', () => {
  it('renders item', () => {
    const ITEM = items[0];

    const { title, address, price } = ITEM;

    const { container } = render((
      <Item item={ITEM} />
    ));

    expect(container).toHaveTextContent(title);
    expect(container).toHaveTextContent(address);
    expect(container).toHaveTextContent(price);
  });
});
