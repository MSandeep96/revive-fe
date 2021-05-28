import { ChatIcon } from '@chakra-ui/icons';
import {
  Divider,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Tag,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { PlatformTag } from '../../platform/PlatformTag';
import { Listing } from '../listingtypes';
import { ListingTypeBox } from './ListingTypeBox';

type ListingViewProps = {
  listing: Listing;
  showContact: boolean;
};

export const ListingView = ({ listing, showContact }: ListingViewProps) => {
  return (
    <HStack h="150px" w="100%" border="2px" rounded="md" boxShadow="xl">
      <Image
        roundedBottomLeft="md"
        roundedTopLeft="md"
        h="100%"
        w="100px"
        src={listing.gameImg}
        fallback={<Skeleton h="100%" w="100px" />}
      />
      <VStack alignItems="flex-start" w="100%" h="100%" py={2}>
        <HStack justify="space-between" w="100%" pr={4}>
          <HStack>
            <Text fontSize="md" isTruncated>
              {listing.gameName}
            </Text>
            <Tag size="sm">
              <TagLabel>{`${(listing.distance ?? 0 / 1000).toFixed(
                2
              )} kms`}</TagLabel>
            </Tag>
          </HStack>
          <PlatformTag platform={listing.platform} />
        </HStack>
        <Divider mt={0} mb={2} />
        <HStack justify="space-between" w="100%" pr={2}>
          <VStack alignItems="flex-start" flexGrow={1}>
            <ListingTypeBox listing={listing} />
          </VStack>
          <VStack h="100%">
            <IconButton
              variant="ghost"
              icon={<ChatIcon />}
              aria-label="Message"
            />
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};
