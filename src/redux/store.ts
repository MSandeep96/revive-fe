import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { appSlice } from '../features/app/appSlice';
import { listingsSlice } from '../features/listings/listingsSlice';
import { nearbyListingSlice } from '../features/listings/nearbyListingSlice';
import { userSlice } from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    mapListings: nearbyListingSlice.reducer,
    listings: listingsSlice.reducer,
    user: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
