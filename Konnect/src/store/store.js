// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // adjust the path as needed
import postReducer from './postSlice'; // adjust the path as needed
export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,

    
  },
});