import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import 'raf/polyfill';

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};
