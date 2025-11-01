import { configureStore } from '@reduxjs/toolkit';
import translationReducer from './features/translationSlice';

export const store = configureStore({
  reducer: {
    translation: translationReducer,
  },
});

export default store;
