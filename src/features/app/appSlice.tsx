import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export type AppState = {
  hasNavigator: boolean;
  hasLocation: boolean;
  location?: number[];
  showLoginModal: boolean;
  isSignUp: boolean;
};

const initialState: AppState = {
  hasNavigator: navigator.geolocation !== undefined,
  hasLocation: false,
  showLoginModal: false,
  isSignUp: true,
};

// Async Thunks

// Slice
export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.hasLocation = true;
      state.location = [action.payload.long, action.payload.lat];
    },
    showLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = true;
      state.isSignUp = action.payload ?? true;
    },
    closeLoginModal: (state) => {
      state.showLoginModal = false;
    },
  },
  extraReducers: (builder) => {},
});

// Actions
export const { setLocation, showLoginModal, closeLoginModal } =
  appSlice.actions;

// Selectors
export const selectLatLong = (state: RootState) =>
  Array.from(state.app.location ?? []).reverse();
