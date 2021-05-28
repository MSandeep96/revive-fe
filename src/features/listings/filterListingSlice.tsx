import { createSlice } from '@reduxjs/toolkit';
import { ApiState, IAPIState } from '../../util/apiTypes';
import { Listing } from './listingtypes';

type FilterListingInitialState = {
  listings?: Listing[];
  listingApiState: IAPIState;
};

const initialState: FilterListingInitialState = {
  listingApiState: {
    status: ApiState.IDLE,
  },
};

// type ListingQueryParams = {
//   filter: typeof filterTypes[0]['value'];
//   radius: typeof radiusTypes[0]['value'];
//   listingType: typeof
// }

// // Async Thunksexport
// const actFetchListings = createAsyncThunk<
//   Listing[],
//   ,
//   {
//     rejectValue: APIErrorType;
//   }
// >('listingState/fetchListings', async (arg, thunkApi) => {
//   try {
//     const resp = await fetchAllListings(arg);
//     return resp.data;
//   } catch (err) {
//     return thunkApi.rejectWithValue(err);
//   }
// });

// Slice
export const filterListingSlice = createSlice({
  name: 'filterListingState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
// Actions
// export const {} = filterListingSlice.actions;

// Selectors
