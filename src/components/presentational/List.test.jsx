import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

import items from '../../../fixtures/items';

describe('List', () => {
  context('with items', () => {
    it('renders items', () => {
      const { container } = render((
        <List items={items} />
      ));

      items.forEach(({ title, region, price }) => {
        expect(container).toHaveTextContent(title);
        expect(container).toHaveTextContent(region);
        expect(container).toHaveTextContent(price);
      });
    });
  });

  context('without items', () => {
    it('renders no items message', () => {
      [[], undefined, null].forEach((emptyItems) => {
        const { container } = render((
          <List items={emptyItems} />
        ));

        expect(container).toHaveTextContent('품목이 없습니다!');
      });
    });
  });
});
