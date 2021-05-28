import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { APIErrorType, ApiState, IAPIState } from '../../util/apiTypes';
import { Platform } from '../app/appTypes';
import {
  apiGetUserProfile,
  apiUpdateUserLocation,
  apiUpdateUsernameProfile,
  apiUpdateUserPlatforms,
} from './userApi';
import { User } from './userTypes';

type UserInitialState = {
  hasProfile: boolean;
  profileApiState: IAPIState;
  usernameApiState: IAPIState;
  user?: User;
};

const initialState: UserInitialState = {
  hasProfile: false,
  profileApiState: {
    status: ApiState.IDLE,
  },
  usernameApiState: {
    status: ApiState.IDLE,
  },
};

// Async Thunks
export const actFetchUserProfile = createAsyncThunk<
  User,
  undefined,
  {
    rejectValue: APIErrorType;
  }
>('userState/fetchUserProfile', async (args, thunkApi) => {
  try {
    const resp = await apiGetUserProfile();
    return resp.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const actSetUserPlatforms = createAsyncThunk<void, Platform[]>(
  'userState/setUserPlatforms',
  async (platforms) => {
    await apiUpdateUserPlatforms(platforms);
  }
);

export const actSetUserLocation = createAsyncThunk<void, number[]>(
  'userState/setUserLocation',
  async (location) => {
    await apiUpdateUserLocation({
      latitude: location[0],
      longitude: location[1],
    });
  }
);

export const actSetUsername = createAsyncThunk<
  void,
  string,
  {
    rejectValue: APIErrorType;
  }
>('userState/setUsername', async (username, thunkApi) => {
  try {
    const resp = await apiUpdateUsernameProfile(username);
    return resp.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

// Slice
export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actFetchUserProfile.pending, (state) => {
        state.profileApiState.status = ApiState.LOADING;
      })
      .addCase(actFetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.hasProfile = true;
        state.profileApiState.status = ApiState.IDLE;
      })
      .addCase(actFetchUserProfile.rejected, (state, action) => {
        state.profileApiState.status = ApiState.FAILED;
        state.profileApiState.error = action.payload?.message;
      })
      .addCase(actSetUsername.pending, (state, action) => {
        state.usernameApiState.status = ApiState.LOADING;
      })
      .addCase(actSetUsername.fulfilled, (state) => {
        state.usernameApiState.status = ApiState.IDLE;
        if (state.user) state.user.isNewUser = false;
      })
      .addCase(actSetUsername.rejected, (state, action) => {
        state.usernameApiState.status = ApiState.FAILED;
        state.usernameApiState.error = action.payload?.error;
      });
  },
});
// Actions
// export const {} = userSlice.actions;

// Selectors
export const selectIsUserLoading = (state: RootState) =>
  state.user.profileApiState.status === ApiState.LOADING;

export const selectHasUserError = (state: RootState) =>
  state.user.profileApiState.status === ApiState.FAILED;
export const selectUserError = (state: RootState) =>
  state.user.profileApiState.error;
export const selectHasUserLocation = (state: RootState) =>
  state.user.user?.location !== undefined;
export const selectHasUserPlatforms = (state: RootState) =>
  state.user.user?.platforms && state.user.user.platforms !== [];
