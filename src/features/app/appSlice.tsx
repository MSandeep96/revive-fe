import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import {
  FilterGridProps,
  radiusTypes,
  sortTypes,
} from '../listings/filterListings/FilterListings';
import { actFetchListings } from '../listings/listingsSlice';
import { ListingSort, ListingType } from '../listings/listingtypes';

export type AppState = {
  hasNavigator: boolean;
  hasLocation: boolean;
  location?: number[];
  showLoginModal: boolean;
  isSignUp: boolean;
  filter: {
    listingTypes: ListingType[];
    sort: ListingSort;
    distance: number;
    pageNo: number;
  };
};

const initialState: AppState = {
  hasNavigator: navigator.geolocation !== undefined,
  hasLocation: false,
  showLoginModal: false,
  isSignUp: true,
  filter: {
    listingTypes: [ListingType.RENT, ListingType.SALE, ListingType.TRADE],
    sort: sortTypes[0].value,
    distance: radiusTypes[0].value,
    pageNo: 1,
  },
};

// Async Thunks
export const incPageNo = createAsyncThunk<void, FilterGridProps>(
  'appState/incPageNo',
  async (arg, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const { pageNo } = state.app.filter;
    const {fetchedTill} = state.listings;
    if(pageNo + 1 > fetchedTill){
      thunkApi.dispatch(
        actFetchListings({
          ...state.app.filter,
          pageNo: pageNo + 1,
          pageLength: arg.rows * arg.cols,
        })
      );
    }
  }
);

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
    setSortType: (state, action: PayloadAction<ListingSort>) => {
      state.filter.pageNo = 1;
      if(action.payload === ListingSort.CHEAPEST){
        state.filter.listingTypes = [ListingType.RENT, ListingType.SALE];
      }
      state.filter.sort = action.payload;
    },
    setRadius: (state, action: PayloadAction<number>) => {      
      state.filter.pageNo = 1;
      state.filter.distance = action.payload;
    },
    setListingsFilter: (state, action: PayloadAction<ListingType[]>) => {
      if(action.payload.length===0) return; 
      state.filter.pageNo = 1;
      state.filter.listingTypes = action.payload;
    },
    decPageNo: (state) => {
      state.filter.pageNo -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incPageNo.fulfilled, (state) => {
      state.filter.pageNo += 1;
    });
  },
});

// Actions
export const {
  setLocation,
  showLoginModal,
  closeLoginModal,
  setSortType,
  setListingsFilter,
  setRadius,
  decPageNo,
} = appSlice.actions;

// Selectors
export const selectLatLong = (state: RootState) =>
  Array.from(state.app.location ?? []).reverse();
