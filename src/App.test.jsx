import React from 'react';

import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

import { loadItem } from './services/storage';

import products from '../fixtures/products';

jest.mock('react-redux');
jest.mock('./services/storage');
jest.mock('./services/api');

const mockStore = configureStore(getDefaultMiddleware());
let store;

describe('App', () => {
  beforeEach(() => {
    store = mockStore({});

    useDispatch.mockImplementation(() => store.dispatch);

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

  function renderApp({ path }) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
  }

  it('renders Title', () => {
    const { container } = renderApp({ path: '/' });

    expect(container).toHaveTextContent('Kcena Market');
  });

  it('navigates home when you click the logo', () => {
    const { container, getByText } = renderApp({ path: '/invalid' });

    expect(container).toHaveTextContent('404 Not Found');

    const goHomeLink = getByText('Kcena Market');
    fireEvent.click(goHomeLink);

    expect(container).toHaveTextContent(products[0].title);
  });

  it('navigates log in when you click the "log in"', () => {
    const { getByLabelText } = renderApp({ path: '/login' });

    expect(getByLabelText('E-mail')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();
  });

  it('navigates Sign up when you click the "Sign up"', () => {
    const { getByLabelText } = renderApp({ path: '/signup' });

    expect(getByLabelText('E-mail')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = renderApp({ path: '/invalid' });

      expect(container).toHaveTextContent('Not Found');
    });
  });

  context('with logged in', () => {
    const mockUser = {
      displayName: 'tester',
      uid: '123456',
    };

    beforeEach(() => {
      loadItem.mockImplementation(() => mockUser);
    });

    it('dispatchs call with user', () => {
      renderApp({ path: '/' });

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'application/setUser',
        payload: mockUser,
      });
    });
  });

  context('with logged out', () => {
    beforeEach(() => {
      loadItem.mockImplementation(() => null);
    });

    it('doesn\'t call dispatch', () => {
      renderApp({ path: '/' });

      const actions = store.getActions();

      expect(actions).toEqual([]);
    });
  });
});
