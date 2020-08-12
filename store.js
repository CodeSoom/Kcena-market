import { configureStore } from '@reduxjs/toolkit';

import reducer from './src/slice';

const store = configureStore({ reducer });

export default store;
