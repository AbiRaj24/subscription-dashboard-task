import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
};

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('theme');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('theme', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: loadState(),
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      saveState(state);
    },
    initTheme: (state) => {
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;