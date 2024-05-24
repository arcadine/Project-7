import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  token: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log('loginSuccess reached');
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;