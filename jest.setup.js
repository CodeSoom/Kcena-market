import '@testing-library/jest-dom';
import 'raf/polyfill';

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};
