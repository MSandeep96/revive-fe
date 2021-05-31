import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { APIErrorType, ApiState, IAPIState } from '../../util/apiTypes';
import { fetchListings } from './listingApi';
import { FetchListingQueryDto, Listing } from './listingtypes';

const listingsAdapter = createEntityAdapter<Listing>({
  selectId: (listing) => listing._id,
});

type ListingsInitalState = ReturnType<typeof listingsAdapter.getInitialState> &  {
  apiState: IAPIState;
  pageCount: number;
  fetchedTill: number;
};

const initialState: ListingsInitalState = listingsAdapter.getInitialState({
  apiState: {
    status: ApiState.IDLE,
  }, 
  pageCount: 0,
  fetchedTill: 0,
});

// Async Thunks
type ActFetchListingsResult = {
  pageCount: number;
  results: Listing[];
  query: FetchListingQueryDto;
}
export const actFetchListings = createAsyncThunk<
  ActFetchListingsResult,
  FetchListingQueryDto,
  {
    rejectValue: APIErrorType;
  }
>('listingState/fetchListings', async (arg, thunkApi) => {
  try {
    const resp = await fetchListings(arg);
    return {...resp.data, query: arg};
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
        state.fetchedTill = action.payload.query.pageNo;
        state.pageCount = action.payload.pageCount;
        if(action.payload.query.pageNo === 1){
          listingsAdapter.setAll(state, action.payload.results);
        }else{
          listingsAdapter.addMany(state, action.payload.results);
        }
      });
  },
});
// Actions
// export const {} = listingsSlice.actions;

// Selectors
const listingSelectors = listingsAdapter.getSelectors(
  (state: RootState) => state.listings
);
export const selectListings = (state: RootState) =>
  listingSelectors.selectAll(state);
export const selectMaxPageCount = (state: RootState) => state.listings.pageCount;
