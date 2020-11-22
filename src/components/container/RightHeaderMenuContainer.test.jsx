import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import RightHeaderMenuContainer from './RightHeaderMenuContainer';

import { logInUser } from '../../../fixtures/user';

jest.mock('react-redux');
describe('RightHeaderMenuContainer', () => {
  const dispatch = jest.fn();

  function renderRightHeaderMenuContainer() {
    return render((
      <MemoryRouter>
        <RightHeaderMenuContainer />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
  });

  context('with user', () => {
    given('user', () => logInUser);

    it('render 판매하기, Log out', () => {
      const { getByText } = renderRightHeaderMenuContainer();
      expect(getByText('판매하기')).not.toBeNull();
      expect(getByText('Log out')).not.toBeNull();
    });

    it('listen logout dispatch', () => {
      const { getByText } = renderRightHeaderMenuContainer();

      fireEvent.click(getByText('Log out'));

      expect(dispatch).toBeCalled();
    });
  });
});
