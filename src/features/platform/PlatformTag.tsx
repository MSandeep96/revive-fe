import { Tag, TagLabel } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { Platform } from '../app/appTypes';
import { getPlatformDisplayName } from './platformUtil';

export const PlatformTag = ({
  platform,
}: {
  platform: Platform;
}): ReactElement => {
  const color = () => {
    switch (platform) {
      case Platform.PS4:
      case Platform.PS5:
        return '#0070D1';
      case Platform.XBOX_1:
      case Platform.XBOX_X:
      default:
        return '#107C10';
    }
  };

  return (
    <Tag size="sm" bg={color()}>
      <TagLabel>{getPlatformDisplayName(platform)}</TagLabel>
    </Tag>
  );
};
