import React from 'react';

import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

import { loadItem } from './services/storage';

import products from '../fixtures/products';
import loggedInUserSellProducts from '../fixtures/loggedInUserSellProducts';

import { logInUser } from '../fixtures/user';

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
      productReducer: {
        products,
        loggedInUserSellProducts,
      },
      authReducer: {
        user: {
          uid: '',
          displayName: '',
          email: '',
        },
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

  it('render log in page', () => {
    const { getByLabelText } = renderApp({ path: '/login' });

    expect(getByLabelText(/E-mail/)).not.toBeNull();
    expect(getByLabelText(/Password/)).not.toBeNull();
  });

  it('render sign up page', () => {
    const { getByLabelText } = renderApp({ path: '/signup' });

    expect(getByLabelText(/E-mail/)).not.toBeNull();
    expect(getByLabelText(/Password/)).not.toBeNull();
  });

  it('render write new product page', () => {
    const { container } = renderApp({ path: '/newproduct' });

    expect(container).toHaveTextContent('Write new product');
    expect(container).toHaveTextContent('상품 이미지를 드래그해서 올려주세요! 또는 클릭해서 파일을 선택해주세요!');
  });

  it('render About me page', () => {
    const { container } = renderApp({ path: '/aboutme' });

    expect(container).toHaveTextContent('내 정보');
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = renderApp({ path: '/invalid' });

      expect(container).toHaveTextContent('Not Found');
    });
  });

  context('with logged in', () => {
    beforeEach(() => {
      loadItem.mockImplementation(() => logInUser);
    });

    it('dispatchs call with user', () => {
      renderApp({ path: '/' });

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'authentication/setUser',
        payload: logInUser,
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
