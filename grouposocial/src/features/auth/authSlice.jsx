import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userEmail: null,
  token: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log('loginSuccess reached', action.payload);
      state.userId = action.payload.userId;
      state.userEmail = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userId = null;
      state.userEmail = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;