import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, action) => {
      console.log("Received token:", action.payload);
      state.token = action.payload;
      localStorage.setItem('token', JSON.stringify(action.payload));
      console.log("Token stored in localStorage:", JSON.stringify(action.payload));
    },
  }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;