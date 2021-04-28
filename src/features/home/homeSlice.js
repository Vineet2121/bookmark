import { createSlice } from '@reduxjs/toolkit';
import * as axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';

//Global
const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {};

const initialState = {
  user: initialUser,
  tabs: [],
  selectedTab: null,
  tabFormType: 'New',
};

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44339/api/',
  //baseURL: 'https://stgknowledgecentral.uhc.com/jobaids/BookmarkToolAPI/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Slice
export const homeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      // state.loading = true;
      // state.error = false;
    },
    getUserTabs: (state, action) => {
      state.tabs = action.payload;
    },
    addNewUserTabs: (state, action) => {
      state.tabs = action.payload;
    },
    editUserTab: (state, action) => {
      state.tabs = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setTabFormType: (state, action) => {
      state.tabFormType = action.payload;
    },
    // logoutSuccess: (state, action) =>  {
    //   state.user = null;
    //   localStorage.removeItem('user')
    // },
  },
});

// Actions
const {
  getUser,
  getUserTabs,
  setSelectedTab,
  setTabFormType,
} = homeSlice.actions;

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    const { data } = await axiosInstance.get(`useridentity/userdetails?msid=`, {
      withCredentials: true,
    });

    dispatch(getUser(data));

    dispatch(asyncActionFinish());
  } catch (e) {
    dispatch(asyncActionError(e));
    console.error(e.message);
  }
};

export const getUserBookmarkTabs = () => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    const { data } = await axiosInstance.get(`tab/tablist`);

    dispatch(getUserTabs(data));

    dispatch(setSelectedTab(data[0]));

    dispatch(asyncActionFinish());
    //toast.success('Data loaded successfull');
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const getSelectedTab = (id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    const { data } = await axiosInstance.get(`tab/${id}`);

    dispatch(setSelectedTab(data));

    dispatch(asyncActionFinish());
    //toast.success('Data loaded successfull');
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const resetTab = () => async (dispatch) => {
  try {
    dispatch(setSelectedTab({ tabName: '' }));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const setFromType = (type) => async (dispatch) => {
  try {
    console.log(type);
    dispatch(setTabFormType(type));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const newBookmarkTab = (tab) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.post(`tab/createtab`, tab);

    toast.success('Tab added successfully');

    dispatch(getUserBookmarkTabs());

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export const editBookmarkTab = (tab, id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());

    await axiosInstance.put(`tab/updatetab`, tab);

    toast.success('Tab updated successfully');

    dispatch(getUserBookmarkTabs());

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error.message);
  }
};

export default homeSlice.reducer;
