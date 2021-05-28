import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { LatLng } from 'leaflet';
import { RootState } from '../../redux/store';
import { APIErrorType, ApiState, IAPIState } from '../../util/apiTypes';
import { fetchGeoListings } from './listingApi';
import { NearbyListings } from './listingtypes';

const nearbyListingsAdapter = createEntityAdapter<NearbyListings>({
  selectId: (mapListing) => mapListing._id,
  sortComparer: (a, b) => (a.distance > b.distance ? 1 : -1),
});

// Async Thunks
export const actFetchListingsForLocation = createAsyncThunk<
  NearbyListings[],
  LatLng,
  {
    rejectValue: APIErrorType;
  }
>('nearbyListingState/fetchListingsForLocation', async (arg, thunkApi) => {
  try {
    const resp = await fetchGeoListings(arg);
    return resp.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

type NearbyListingInitialState = ReturnType<
  typeof nearbyListingsAdapter.getInitialState
> & {
  apiState: IAPIState;
  openModal: boolean;
  modalListing: NearbyListings;
  openDrawer: boolean;
};

// Slice
export const nearbyListingSlice = createSlice({
  name: 'nearbyListingState',
  initialState: nearbyListingsAdapter.getInitialState({
    apiState: {
      status: ApiState.IDLE,
    },
    openModal: false,
  }) as NearbyListingInitialState,
  reducers: {
    openMapListingModal: (state, action: PayloadAction<NearbyListings>) => {
      state.openModal = true;
      state.modalListing = action.payload;
    },
    closeMapListingModal: (state) => {
      state.openModal = false;
    },
    openDrawerListingModal: (state, action: PayloadAction<NearbyListings>) => {
      state.openDrawer = true;
      state.modalListing = action.payload;
    },
    closeDrawerListingModal: (state) => {
      state.openDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actFetchListingsForLocation.pending, (state) => {
        state.apiState.status = ApiState.LOADING;
      })
      .addCase(actFetchListingsForLocation.fulfilled, (state, action) => {
        state.apiState.status = ApiState.IDLE;
        nearbyListingsAdapter.addMany(state, action.payload);
      })
      .addCase(actFetchListingsForLocation.rejected, (state, action) => {
        state.apiState.status = ApiState.FAILED;
        state.apiState.error = action.error.message;
      });
  },
});
// Actions
export const {
  openMapListingModal,
  closeMapListingModal,
  openDrawerListingModal,
  closeDrawerListingModal,
} = nearbyListingSlice.actions;

// Selectors
const mapListingSelectors = nearbyListingsAdapter.getSelectors(
  (state: RootState) => state.mapListings
);
export const selectMapListings = (state: RootState) =>
  mapListingSelectors.selectAll(state);
