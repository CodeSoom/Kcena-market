import React from 'react';

import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import ListContainer from './ListContainer';

import items from '../../../fixtures/items';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  function renderListContainer() {
    return render((
      <ListContainer />
    ));
  }
  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      items: given.items,
    }));
  });

  context('with items', () => {
    given('items', () => items);

    it('renders items', () => {
      const { getByText } = renderListContainer();

      items.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });
    });
  });

  context('without items', () => {
    given('items', () => []);

    it('load items', () => {
      renderListContainer();

      expect(dispatch).toBeCalledTimes(1);
    });

    it('renders no items message', () => {
      const { getByText } = renderListContainer();

      expect(getByText('품목이 없습니다!')).not.toBeNull();
    });
  });
});
