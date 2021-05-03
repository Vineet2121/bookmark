import { createSlice } from '@reduxjs/toolkit';
import * as axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';

const initialState = {
  categories: [],
  selectedCategory: null,
  categoryFormType: 'New',
  currentCategory: null,
};

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44339/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Slice
export const categorySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getBookmarkCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFormType: (state, action) => {
      state.categoryFormType = action.payload;
    },
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

// Actions
const {
  getBookmarkCategories,
  setSelectedCategory,
  setFormType,
  setCategory,
} = categorySlice.actions;

export const getCategories = (tabID) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    const { data } = await axiosInstance.get(`category/categorylist/${tabID}`);

    dispatch(getBookmarkCategories(data));

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const setCurrentCategory = (id) => async (dispatch) => {
  try {
    dispatch(setCategory(id));
  } catch (error) {
    console.error(error);
  }
};

export const getSelectedCategory = (id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    const { data } = await axiosInstance.get(`category/${id}`);
    console.log('cat', data);

    dispatch(setSelectedCategory(data));

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const resetTab = () => async (dispatch) => {
  try {
    dispatch(setSelectedCategory({ userTabID: null, catName: '' }));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const setCategoryFormType = (type) => async (dispatch) => {
  try {
    console.log(type);
    dispatch(setFormType(type));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const newBookmarkCatgory = (category) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.post(`category/createcategory`, category);

    toast.success('Category added successfully');

    dispatch(getCategories(category.userTabID));

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export const editBookmarkCategory = (category) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.put(`category/updatecategory`, category);

    toast.success('Category updated successfully');

    dispatch(getBookmarkCategories());

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export const deleteBookmarkCategory = (category) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.put(`category/deletecategory`, category);

    toast.success('Category deleted successfully');

    dispatch(getBookmarkCategories());

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export default categorySlice.reducer;
