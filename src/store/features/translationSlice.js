import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const setItemWithExpiration = (key, value, expirationMs) => {
  const item = {
    value: value,
    expiration: new Date().getTime() + expirationMs,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiration = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiration) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const initialState = {
  language: getItemWithExpiration('language') || 'en',
  textDirection: 'ltr',
};

if (getItemWithExpiration('language') === 'ar' || getItemWithExpiration('language') === 'he') {
  initialState.textDirection = 'rtl';
}

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;

      if (action.payload === 'ar' || action.payload === 'he') {
        state.textDirection = 'rtl';
      } else {
        state.textDirection = 'ltr';
      }

      // Set document direction and text alignment
      const rtlLanguages = ['ar', 'ur', 'he', 'fa'];
      if (rtlLanguages.includes(action.payload)) {
        document.body.dir = 'rtl';
        document.body.style.textAlign = 'right';
      } else {
        document.body.dir = 'ltr';
        document.body.style.textAlign = 'left';
      }

      // Save to localStorage with 1 year expiration
      setItemWithExpiration('language', action.payload, 1000 * 60 * 60 * 24 * 365);
    },
  },
});

export const { setLanguage } = translationSlice.actions;
export default translationSlice.reducer;
