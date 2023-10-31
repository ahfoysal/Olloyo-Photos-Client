// authSlice.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUser {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  emailVerified: boolean | null;
  uid: string | null;
}

interface AuthState {
  user: IUser;
}

const initialState: AuthState = {
  user: {
    displayName: null,
    emailVerified: null,
    photoURL: null,
    uid: null,
    email: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          email: action.payload.email,
        },
      };
    },
    resetUser: (state) => {
      return {
        ...state,
        user: {
          displayName: null,
          emailVerified: null,
          photoURL: null,
          uid: null,
          email: null,
        },
      };
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
