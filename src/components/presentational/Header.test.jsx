import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Header from './Header';

jest.mock('react-redux');

describe('Header', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
  });

  function renderHeader() {
    return render((
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    ));
  }

  context('with user uid', () => {
    given('user', () => ({
      displayName: 'tester',
      uid: 'test1234',
    }));

    it('render title, Log In and Sign up', () => {
      const controls = ['Kcena Market', 'Log In', 'Sign up'];
      const { getByText } = renderHeader();

      controls.forEach((control) => {
        expect(getByText(control)).not.toBeNull();
      });
    });

    it('render 판매하기', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('판매하기');
    });
  });

  context('without user uid', () => {
    given('user', () => ({
      displayName: '',
      uid: '',
    }));

    it('render title, Log In and Sign up', () => {
      const controls = ['Kcena Market', 'Log In', 'Sign up'];
      const { getByText } = renderHeader();

      controls.forEach((control) => {
        expect(getByText(control)).not.toBeNull();
      });
    });

    it('doesn\'t render 판매하기', () => {
      const { container } = renderHeader();

      expect(container).not.toHaveTextContent('판매하기');
    });
  });
});
