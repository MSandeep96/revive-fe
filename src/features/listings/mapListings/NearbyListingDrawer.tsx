import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ListingView } from '../components/ListingView';
import { closeDrawerListingModal } from '../nearbyListingSlice';

export const NearbyListingDrawer = (): ReactElement => {
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(closeDrawerListingModal());
  const listings = useAppSelector((state) => state.mapListings.modalListing);

  return (
    <Drawer size="sm" isOpen placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader shadow="xl">Listings</DrawerHeader>
        <DrawerBody mt={2}>
          <VStack spacing={4}>
            {listings.games.map((listing) => (
              <ListingView listing={listing} showContact />
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
