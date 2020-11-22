import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AboutMePage from './AboutMePage';

import { loadItem } from '../services/storage';

jest.mock('../services/storage');

jest.mock('react-redux');
describe('AboutMePage', () => {
  const dispatch = jest.fn();

  function renderAboutMePage() {
    return render((
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        loggedInUserSellProducts: [],
      },
    }));
    loadItem.mockImplementation(() => given.mockUser);
  });

  context('with user', () => {
    given('mockUser', () => ({
      email: 'tester@example.com',
      displayName: 'tester',
      uid: '123456',
    }));

    it('render AboutMePage', () => {
      const { container } = renderAboutMePage();

      expect(container).toHaveTextContent('내 정보');
    });

    it('render according to the tab selected by the user', () => {
      const { container, getByText } = renderAboutMePage();

      fireEvent.click(getByText('판매중인 상품'));

      expect(container).toHaveTextContent('품목이 없습니다!');
    });
  });

  context('without user', () => {
    given('mockUser', () => null);
    it('render login page', () => {
      const { container } = renderAboutMePage();

      expect(container).not.toHaveTextContent('내 정보');
    });
  });
});
