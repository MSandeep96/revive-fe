import { Box, Tag, TagLabel } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import {
  Listing,
  ListingType,
  RentDetails,
  SaleDetails,
} from '../listingtypes';
import { getPeriodDisplayName } from '../listingUtil';

const RentTag = ({ rentDetails }: { rentDetails: RentDetails | undefined }) => {
  return (
    <Box>
      <Tag size="sm" bg="red.400" pos="relative" zIndex={2} rounded="full">
        <TagLabel>Rent</TagLabel>
      </Tag>
      <Tag size="sm" bg="white" ml={-4} pl={5} color="gray.800" rounded="full">
        <TagLabel>{`${rentDetails?.price} ₹/${getPeriodDisplayName(
          rentDetails?.period
        )}`}</TagLabel>
      </Tag>
    </Box>
  );
};

const SaleTag = ({ saleDetails }: { saleDetails: SaleDetails | undefined }) => {
  return (
    <Box>
      <Tag size="sm" bg="green.400" pos="relative" zIndex={2} rounded="full">
        <TagLabel>Sale</TagLabel>
      </Tag>
      <Tag size="sm" bg="white" ml={-4} pl={5} color="gray.800" rounded="full">
        <TagLabel>{`${saleDetails?.price} ₹`}</TagLabel>
      </Tag>
    </Box>
  );
};

const TradeTag = () => {
  return (
    <Tag size="sm" bg="blue.400" rounded="full">
      <TagLabel>Trade</TagLabel>
    </Tag>
  );
};

export const ListingTypeBox = ({
  listing,
}: {
  listing: Listing;
}): ReactElement => {
  return (
    <>
      {[...listing.listingType].sort().map((type: string) => {
        switch (type) {
          case ListingType.RENT:
            return <RentTag rentDetails={listing.rentDetails} />;
          case ListingType.SALE:
            return <SaleTag saleDetails={listing.saleDetails} />;
          default:
            return <TradeTag />;
        }
      })}
    </>
  );
};
