import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ListingView } from '../components/ListingView';
import { closeMapListingModal } from '../nearbyListingSlice';

export const NearbyListingModal = (): ReactElement => {
  const modalListing = useAppSelector(
    (state) => state.mapListings.modalListing
  );
  const dispatch = useAppDispatch();
  return (
    <Modal isOpen onClose={() => dispatch(closeMapListingModal())}>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader shadow="md">Games available at location: </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2} my={2} alignItems="flex-start">
            {modalListing.games.slice(0, 4).map((listing) => (
              <ListingView listing={listing} showContact={false} />
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>& many more</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
