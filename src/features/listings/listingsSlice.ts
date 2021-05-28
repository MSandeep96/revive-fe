import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIErrorType, ApiState, IAPIState } from '../../util/apiTypes';
import { fetchListings } from './listingApi';
import { FetchListingQueryDto, Listing } from './listingtypes';

type ListingsInitalState = {
  listings?: Listing[];
  apiState: IAPIState;
};

const initialState: ListingsInitalState = {
  apiState: {
    status: ApiState.IDLE,
  },
};

// Async Thunks
export const actFetchListings = createAsyncThunk<
  Listing[],
  FetchListingQueryDto,
  {
    rejectValue: APIErrorType;
  }
>('listingState/fetchListings', async (arg, thunkApi) => {
  try {
    const resp = await fetchListings(arg);
    return resp.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

// Slice
export const listingsSlice = createSlice({
  name: 'listingsState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actFetchListings.pending, (state) => {
        state.apiState.status = ApiState.LOADING;
      })
      .addCase(actFetchListings.fulfilled, (state, action) => {
        state.apiState.status = ApiState.IDLE;
        state.listings = action.payload;
      });
  },
});
// Actions
// export const {} = listingsSlice.actions;

// Selectors
