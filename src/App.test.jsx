import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

import products from '../fixtures/products';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      products,
      loginFields: {
        email: '',
        password: '',
      },
      signupFields: {
        email: '',
        password: '',
      },
      user: {
        uid: '',
        displayName: '',
      },
    }));
  });

  it('renders Title', () => {
    const { container } = render((
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('Kcena Market');
  });

  it('navigates home when you click the logo', () => {
    const { container, getByText } = render(
      <MemoryRouter initialEntries={['/invalid']}>
        <App />
      </MemoryRouter>,
    );
    expect(container).toHaveTextContent('404 Not Found');

    const goHomeLink = getByText('Kcena Market');
    fireEvent.click(goHomeLink);

    expect(container).toHaveTextContent(products[0].title);
  });

  it('navigates log in when you click the "log in"', () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByLabelText('E-mail')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();
  });

  it('navigates Sign up when you click the "Sign up"', () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByLabelText('E-mail')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = render((
        <MemoryRouter initialEntries={['/invalid']}>
          <App />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('Not Found');
    });
  });
});
