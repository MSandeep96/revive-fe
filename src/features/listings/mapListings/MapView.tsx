import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { icon, LatLng, LatLngTuple } from 'leaflet';
import React, { ReactElement, useEffect } from 'react';
import { CircleMarker, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ApiState } from '../../../util/apiTypes';
import { selectLatLong } from '../../app/appSlice';
import { NearbyListings } from '../listingtypes';
import {
  actFetchListingsForLocation,
  openMapListingModal,
  selectMapListings,
} from '../nearbyListingSlice';
import { MapEventHandler } from './MapEventHandler';
import { NearbyListingDrawer } from './NearbyListingDrawer';
import { NearbyListingModal } from './NearbyListingModal';

export type MapViewProps = {
  onMarkerClick: ActionCreatorWithPayload<NearbyListings> | undefined;
};

export const MapView = (props: MapViewProps): ReactElement => {
  const location = useAppSelector(selectLatLong) as LatLngTuple;
  const dispatch = useAppDispatch();
  const listings = useAppSelector(selectMapListings);
  const apiState = useAppSelector((state) => state.mapListings.apiState.status);
  const error = useAppSelector((state) => state.mapListings.apiState.error);
  const isModalOpen = useAppSelector((state) => state.mapListings.openModal);
  const isDrawerOpen = useAppSelector((state) => state.mapListings.openDrawer);

  useEffect(() => {
    dispatch(actFetchListingsForLocation(new LatLng(location[0], location[1])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.toString()]);

  const listingDetails = () => {
    if (apiState === ApiState.LOADING) {
      return (
        <Flex h="100%" justifyContent="center" alignItems="center">
          <Spinner size="xl" zIndex={1000} />
        </Flex>
      );
    }
    if (listings?.length === 0) {
      return (
        <Box
          pos="absolute"
          bottom={4}
          zIndex={1000}
          bg="blackAlpha.800"
          color="white"
          left={4}
        >
          <Text fontSize="2xl">No listings near you at this moment</Text>
        </Box>
      );
    }
    return null;
  };

  const getListings = () => {
    return listings.map((listing) => {
      const center = [...listing.location.coordinates].reverse() as LatLngTuple;
      const action = props.onMarkerClick ?? openMapListingModal;
      return (
        <CircleMarker
          key={listing._id}
          center={center}
          radius={20}
          eventHandlers={{
            click: () => dispatch(action(listing)),
          }}
        />
      );
    });
  };

  return (
    <Box flexGrow={1} width="100%" p={4}>
      <Box pos="relative" h="100%" w="100%">
        <MapContainer
          style={{ height: '100%', width: '100%', borderRadius: '10px' }}
          center={location}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={location}
            icon={icon({
              iconUrl: './assets/userLocation.png',
              iconSize: [30, 30],
            })}
          />
          {getListings()}
          <MapEventHandler />
        </MapContainer>
        <Box
          h="100%"
          w="100%"
          pos="absolute"
          top="0"
          zIndex="1000"
          pointerEvents="none"
          rounded="md"
          boxShadow="inset 0 0 10px #000000"
        >
          {listingDetails()}
        </Box>
      </Box>
      {isModalOpen ? <NearbyListingModal /> : null}
      {isDrawerOpen ? <NearbyListingDrawer /> : null}
    </Box>
  );
};
