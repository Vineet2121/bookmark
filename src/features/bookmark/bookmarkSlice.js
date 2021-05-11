import { createSlice } from '@reduxjs/toolkit';
import * as axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {
//   asyncActionError,
//   asyncActionFinish,
//   asyncActionStart,
// } from '../../app/async/asyncReducer';
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
  bookmarks: [],
  selectedBookmark: null,
  bookmarkFormType: 'New',
  loading: false,
  error: false,
};

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Slice
export const bookmarkSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    bookmarkRequestStart: (state, action) => {
      state.loading = true;
      state.bookmarks = [];
    },
    bookmarkRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getBookmarks: (state, action) => {
      state.bookmarks = action.payload;
      state.loading = false;
    },
    setSelectedBookmark: (state, action) => {
      state.selectedBookmark = action.payload;
    },
    setFormType: (state, action) => {
      state.bookmarkFormType = action.payload;
    },
    asyncActionStart: (state, action) => {
      state.loading = true;
    },

    asyncActionFinish: (state, action) => {
      state.loading = false;
    },

    asyncActionError: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

// Actions
const {
  bookmarkRequestStart,
  bookmarkRequestFail,
  getBookmarks,
  setSelectedBookmark,
  setFormType,
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} = bookmarkSlice.actions;

export const fetchBookmarks = (catID) => async (dispatch) => {
  try {
    dispatch(bookmarkRequestStart());

    const { data } = await axiosInstance.get(`bookmark/bookmarklist/${catID}`);
    return data;
    //dispatch(getBookmarks(data));
  } catch (error) {
    dispatch(bookmarkRequestFail(error));
  }
};

export const getBookmarksList = (catID) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    const result = await axiosInstance.get(`bookmark/bookmarklist/${catID}`);

    // if (data) {
    //   dispatch(getBookmarks(data));
    // }

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const getSelectedBookmark = (id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    const { data } = await axiosInstance.get(`bookmark/${id}`);

    dispatch(setSelectedBookmark(data));

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const resetTab = () => async (dispatch) => {
  try {
    dispatch(
      setSelectedBookmark({ title: null, url: '', tags: '', notes: '' })
    );
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const setBookmarkFormType = (type) => async (dispatch) => {
  try {
    dispatch(setFormType(type));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const newBookmark = (bookmark) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.post(`bookmark/createbookmark`, bookmark);

    toast.success('Bookmark added successfully');

    dispatch(getBookmarksList(bookmark.catID));

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export const moveBookmark = (moveBoomark) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.post(`bookmark/movebookmark`, moveBoomark);

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export const editBookmark = (bookmark) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.put(`bookmark/updatebookmark`, bookmark);

    toast.success('Bookmark updated successfully');

    dispatch(getBookmarksList());

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export const deleteBookmark = (bookmark) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.delete(`bookmark/deletebookmark`, bookmark);

    toast.success('Bookmark deleted successfully');

    dispatch(getBookmarksList());

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export const updateBookmarkOrderState = (catID, type) => async (dispatch) => {
  try {
    const bookmarksState = {
      catID,
      type,
    };

    dispatch(asyncActionStart());

    await axiosInstance.post(`bookmark/SortBookmarks`, bookmarksState);

    dispatch(getBookmarksList(catID));

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export default bookmarkSlice.reducer;
