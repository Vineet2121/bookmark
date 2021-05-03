import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import categoryReducer from '../features/category/categorySlice';
import bookmarkReducer from '../features/bookmark/bookmarkSlice';
import asyncReducer from './async/asyncReducer';
import modalReducer from './common/modals/modalReducer';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    category: categoryReducer,
    bookmark: bookmarkReducer,
    async: asyncReducer,
    modals: modalReducer,
  },
});
