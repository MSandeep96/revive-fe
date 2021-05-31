import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  ButtonGroup,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  HStack,
  IconButton,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ApiState } from '../../../util/apiTypes';
import {
  decPageNo,
  incPageNo,
  setListingsFilter,
  setRadius,
  setSortType,
} from '../../app/appSlice';
import { ListingView } from '../components/ListingView';
import { actFetchListings, selectListings } from '../listingsSlice';
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

export type FilterGridProps = {
  rows: number;
  cols: number;
  hSpacing: number;
  vSpacing: number;
};

export const FilterListings = (): ReactElement => {
  const dispatch = useAppDispatch();
  const listingsFilter = useAppSelector(
    (state) => state.app.filter.listingTypes
  );
  const sortType = useAppSelector((state) => state.app.filter.sort);
  const radius = useAppSelector((state) => state.app.filter.distance);
  const pageNo = useAppSelector((state) => state.app.filter.pageNo);
  const maxPageCount = useAppSelector((state) => state.listings.pageCount);
  const [gridProps, setGridProps] = useState<FilterGridProps | null>(null);

  const isLoading = useAppSelector(
    (state) => state.listings.apiState.status === ApiState.LOADING
  );
  const listings = useAppSelector(selectListings);
  const ref = useRef<HTMLDivElement>(null);

  const sortTypesAvailable =
    listingsFilter.toString() === [ListingType.TRADE].toString()
      ? [...sortTypes].slice(0, 2)
      : [...sortTypes];

  useEffect(() => {
    if (listingsFilter.toString() === [ListingType.TRADE].toString()) {
      if (sortType === ListingSort.CHEAPEST) {
        dispatch(setSortType(ListingSort.NEAREST));
      }
    }
  }, [dispatch, listingsFilter, sortType]);

  useEffect(() => {
    if (gridProps !== null) {
      dispatch(
        actFetchListings({
          distance: radius,
          sort: sortType,
          listingTypes: listingsFilter,
          pageLength: gridProps.rows * gridProps.cols,
          pageNo: 1,
        })
      );
    }
  }, [dispatch, gridProps, listingsFilter, radius, sortType]);

  useLayoutEffect(() => {
    if (ref && ref.current !== null) {
      const height = ref.current.clientHeight;
      const width = ref.current.clientWidth;
      const rows = Math.floor(height / 150);
      const cols = Math.floor(width / 450);
      const hSpacing =
        rows === 1 ? 0 : Math.floor((height - rows * 150) / (rows - 1));
      const vSpacing =
        cols === 1 ? 0 : Math.floor((width - cols * 450) / (cols - 1));
      setGridProps({
        rows,
        cols,
        hSpacing,
        vSpacing,
      });
    }
  }, []);

  const getListings = () => {
    if (gridProps === null) return null;
    const elementsPerPage = gridProps.cols * gridProps.rows;
    return listings
      ?.slice(elementsPerPage * (pageNo - 1), elementsPerPage * pageNo)
      .map((listing) => <ListingView listing={listing} showContact />);
  };

  return (
    <Flex flexDir="column" h="100%">
      <HStack justify="flex-end" spacing={4}>
        <Select
          size="sm"
          w="auto"
          variant="flushed"
          icon={<ChevronDownIcon />}
          px={2}
          value={sortType}
          onChange={(e: any) => {
            dispatch(setSortType(e.currentTarget.value));
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
            dispatch(setRadius(e.currentTarget.value));
          }}
        >
          {radiusTypes.map((type) => (
            <option value={type.value}>{type.title}</option>
          ))}
        </Select>
        <CheckboxGroup
          onChange={(vals) =>
            dispatch(setListingsFilter(vals as ListingType[]))
          }
          value={listingsFilter}
        >
          <Stack direction="row">
            {listingTypes.map((type) => (
              <Checkbox value={type.value}>{type.title}</Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        <ButtonGroup
          variant="ghost"
          isAttached
          border="1px"
          rounded="md"
          borderColor="inherit"
        >
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Previous page"
            disabled={pageNo === 1}
            onClick={() => dispatch(decPageNo())}
          />
          <Center mx={2}>
            <Text>{pageNo}</Text>
          </Center>
          <IconButton
            icon={<ChevronRightIcon />}
            aria-label="Next page"
            disabled={maxPageCount === 0 || maxPageCount === pageNo}
            onClick={() => dispatch(incPageNo(gridProps as FilterGridProps))}
          />
        </ButtonGroup>
      </HStack>
      <Skeleton isLoaded={!isLoading} h="100%" mt={4} ref={ref} flexGrow={1}>
        {listings && listings.length !== 0 ? (
          <SimpleGrid
            columns={gridProps?.cols}
            spacingX={`${gridProps?.vSpacing}px`}
            spacingY={`${gridProps?.hSpacing}px`}
          >
            {getListings()}
          </SimpleGrid>
        ) : (
          <Center w="100%" h="100%">
            <Text m="auto">
              No listings available.
              <br /> Try increasing the radius.
            </Text>
          </Center>
        )}
      </Skeleton>
    </Flex>
  );
};
