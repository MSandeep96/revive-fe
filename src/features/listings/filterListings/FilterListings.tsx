import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  HStack,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ApiState } from '../../../util/apiTypes';
import { ListingView } from '../components/ListingView';
import { actFetchListings } from '../listingsSlice';
import { ListingSort, ListingType } from '../listingtypes';

export const sortTypes = [
  { title: 'Nearby', value: ListingSort.NEAREST },
  { title: 'Latest', value: ListingSort.LATEST },
  { title: 'Price', value: ListingSort.CHEAPEST },
];

export const radiusTypes = [
  { title: '5km', value: 5 },
  { title: '10km', value: 10 },
  { title: '15km', value: 15 },
  { title: '20km', value: 20 },
];

export const listingTypes = [
  { title: 'Rent', value: ListingType.RENT },
  { title: 'Sale', value: ListingType.SALE },
  { title: 'Trade', value: ListingType.TRADE },
];

export const FilterListings = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [listingsFilter, setListingsFilter] = useState<ListingType[]>([
    ListingType.RENT,
    ListingType.SALE,
    ListingType.TRADE,
  ]);
  const [sortType, setSortType] = useState(sortTypes[0].value);
  const [radius, setRadius] = useState(radiusTypes[0].value);

  const isLoading = useAppSelector(
    (state) => state.listings.apiState.status === ApiState.LOADING
  );
  const listings = useAppSelector((state) => state.listings.listings);

  const sortTypesAvailable =
    listingsFilter.toString() === [ListingType.TRADE].toString()
      ? [...sortTypes].slice(0, 2)
      : [...sortTypes];

  useEffect(() => {
    if (listingsFilter.toString() === [ListingType.TRADE].toString()) {
      if (sortType === ListingSort.CHEAPEST) {
        setSortType(ListingSort.NEAREST);
      }
    }
  }, [listingsFilter, sortType]);

  useEffect(() => {
    dispatch(
      actFetchListings({
        distance: radius,
        sort: sortType,
        listingTypes: listingsFilter,
      })
    );
  }, [dispatch, listingsFilter, radius, sortType]);

  return (
    <Flex flexDir="column">
      <HStack justify="flex-end" spacing={4}>
        <Select
          size="sm"
          w="auto"
          variant="flushed"
          icon={<ChevronDownIcon />}
          px={2}
          value={sortType}
          onChange={(e: any) => {
            setSortType(e.currentTarget.value);
          }}
        >
          {sortTypesAvailable.map((type) => (
            <option value={type.value}>{type.title}</option>
          ))}
        </Select>
        <Select
          size="sm"
          w="auto"
          variant="flushed"
          icon={<ChevronDownIcon />}
          px={2}
          onChange={(e: any) => {
            setRadius(e.currentTarget.value);
          }}
        >
          {radiusTypes.map((type) => (
            <option value={type.value}>{type.title}</option>
          ))}
        </Select>
        <CheckboxGroup
          onChange={(vals) => setListingsFilter(vals as ListingType[])}
          value={listingsFilter}
        >
          <Stack direction="row">
            {listingTypes.map((type) => (
              <Checkbox value={type.value}>{type.title}</Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </HStack>
      <Skeleton isLoaded={!isLoading}>
        <SimpleGrid mt={4} columns={3} spacing={8}>
          {listings?.map((listing) => (
            <ListingView listing={listing} showContact />
          ))}
        </SimpleGrid>
      </Skeleton>
    </Flex>
  );
};
