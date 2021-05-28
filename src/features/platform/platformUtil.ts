import { Platform } from '../app/appTypes';

export const getPlatformDisplayName = (platform: Platform) => {
  switch (platform) {
    case Platform.PS4:
    case Platform.PS5:
      return platform.toUpperCase();
    case Platform.XBOX_1:
    case Platform.XBOX_X:
      return platform
        .split('_')
        .map((s) => s.toUpperCase())
        .join(' ');
    default:
      return 'PS4';
  }
};
