import { IEndpoints } from '../../util/apiTypes';
import { iaxios } from '../../util/iaxios';
import { Platform } from '../app/appTypes';

const Endpoints: IEndpoints = {
  USER_PROFILE: {
    url: 'user',
    method: 'GET',
  },
  UPDATE_USERNAME: {
    url: 'user/username',
    method: 'PUT',
  },
  UPDATE_PLATFORMS: {
    url: 'user/platforms',
    method: 'PUT',
  },
  UPDATE_LOCATION: {
    url: 'user/location',
    method: 'PUT',
  },
};

export const apiGetUserProfile = async () => {
  return await iaxios.request({
    url: Endpoints.USER_PROFILE.url,
    method: Endpoints.USER_PROFILE.method,
  });
};

export const apiUpdateUsernameProfile = async (username: string) => {
  return await iaxios.request({
    url: Endpoints.UPDATE_USERNAME.url,
    method: Endpoints.UPDATE_USERNAME.method,
    data: { username },
  });
};

export const apiUpdateUserPlatforms = async (platforms: Platform[]) => {
  return await iaxios.request({
    url: Endpoints.UPDATE_PLATFORMS.url,
    method: Endpoints.UPDATE_PLATFORMS.method,
    data: { platforms },
  });
};

export type UserLocationDto = {
  latitude: number;
  longitude: number;
};

export const apiUpdateUserLocation = async (location: UserLocationDto) => {
  return await iaxios.request({
    url: Endpoints.UPDATE_LOCATION.url,
    method: Endpoints.UPDATE_LOCATION.method,
    data: location,
  });
};
