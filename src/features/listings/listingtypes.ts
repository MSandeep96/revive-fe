import { LocationSchema, Platform } from '../app/appTypes';

export enum ListingType {
  SALE = 'sale',
  TRADE = 'trade',
  RENT = 'rent',
}

export enum RentingPeriod {
  DAY = 'd',
  WEEK = 'w',
  MONTH = 'm',
}

export type SaleDetails = {
  price: number;
};

export type RentDetails = {
  price: number;
  period: RentingPeriod;
};

export type Listing = {
  createdBy: string;
  slug: string;
  platform: Platform;
  location: LocationSchema;
  listingType: ListingType[];
  saleDetails?: SaleDetails;
  rentDetails?: RentDetails;
  gameName: string;
  gameImg: string;
  distance?: number;
};

export interface NearbyListings {
  _id: string;
  games: Listing[];
  location: LocationSchema;
  distance: number;
}

export enum ListingSort {
  NEAREST = 'nearest',
  LATEST = 'latest',
  CHEAPEST = 'cheapest',
}

export interface FetchListingQueryDto {
  sort: ListingSort;
  distance: number;
  listingTypes: ListingType[];
  pageNo: number;
  pageLength: number;
}
