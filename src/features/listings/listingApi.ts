import { LatLng } from 'leaflet';
import { IEndpoints } from '../../util/apiTypes';
import { iaxios } from '../../util/iaxios';
import { FetchListingQueryDto } from './listingtypes';

const Endpoints: IEndpoints = {
  FETCH_GEO_LISTINGS: {
    method: 'GET',
    url: 'listing/map',
  },
  FETCH_LISTINGS: {
    method: 'GET',
    url: 'listing',
  },
};

export const fetchGeoListings = async (data: LatLng) => {
  return await iaxios.request({
    url: Endpoints.FETCH_GEO_LISTINGS.url,
    method: Endpoints.FETCH_GEO_LISTINGS.method,
    params: {
      long: data.lng,
      lat: data.lat,
    },
  });
};

export const fetchListings = async (query: FetchListingQueryDto) => {
  return await iaxios.request({
    url: Endpoints.FETCH_LISTINGS.url,
    method: Endpoints.FETCH_LISTINGS.method,
    params: query,
  });
};
