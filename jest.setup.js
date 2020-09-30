import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import 'raf/polyfill';

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};
