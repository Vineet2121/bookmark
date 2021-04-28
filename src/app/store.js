import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import categoryReducer from '../features/category/categorySlice';
import asyncReducer from './async/asyncReducer';
import modalReducer from './common/modals/modalReducer';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    category: categoryReducer,
    async: asyncReducer,
    modals: modalReducer,
  },
});
