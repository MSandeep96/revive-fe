import { ChatIcon } from '@chakra-ui/icons';
import {
  Divider,
  HStack,
  IconButton,
  Image,
  Skeleton,
  StackDivider,
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
    <HStack h="150px" w="100%" border="1px" rounded="md" boxShadow="xl">
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
          <Text fontSize="md" isTruncated>
            {listing.gameName}
          </Text>
          <IconButton
            size="xs"
            variant="ghost"
            icon={<ChatIcon />}
            aria-label="Message"
          />
        </HStack>
        <Divider mt={0} mb={2} />
        <HStack
          justify="space-between"
          h="100%"
          w="100%"
          pr={2}
          divider={<StackDivider borderColor="inherit" />}
        >
          <VStack alignItems="flex-start" h="100%" flexGrow={1}>
            <ListingTypeBox listing={listing} />
          </VStack>
          <VStack justifyContent="flex-start" h="100%">
            <PlatformTag platform={listing.platform} />
            <Tag size="sm">
              <TagLabel>
                {`${((listing.distance ?? 0) / 1000).toFixed(2)} kms`}
              </TagLabel>
            </Tag>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};
