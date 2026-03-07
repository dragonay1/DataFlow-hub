import { createSlice } from '@reduxjs/toolkit';

export interface AuthSliceValues {
  userData: {
    userId: string;
    email: string;
    token: string;
    refreshToken: string;
    roles: Array<string>;
  };
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: {
      userId: '',
      email: '',
      token: '',
      refreshToken: '',
      roles: [] as Array<string>,
    },
    isAuthenticated: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserData, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
