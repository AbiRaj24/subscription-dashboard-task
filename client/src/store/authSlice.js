import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
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
    localStorage.setItem('auth', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    setAuth: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      saveState(state);
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      saveState(state);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveState(state);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
  },
});

export const { setAuth, setAccessToken, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;