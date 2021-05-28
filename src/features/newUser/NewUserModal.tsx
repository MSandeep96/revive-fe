import {
  Button,
  Divider,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaGamepad, FaUser } from 'react-icons/fa';
import { TiLocation } from 'react-icons/ti';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectLatLong, setLocation } from '../app/appSlice';
import { Platform } from '../app/appTypes';
import {
  actSetUserLocation,
  actSetUsername,
  actSetUserPlatforms,
  selectHasUserLocation,
  selectHasUserPlatforms,
} from '../user/userSlice';
import { PickConsole } from './components/PickConsole';
import { PickLocation } from './components/PickLocation';
import { PickUsername } from './components/PickUsername';

export const NewUserModal = (): ReactElement => {
  const isNewUser = useAppSelector((state) => state.user.user?.isNewUser);
  const hasUserPlatforms = useAppSelector(selectHasUserPlatforms);
  const hasUserLocation = useAppSelector(selectHasUserLocation);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [active, setActive] = useState<Platform[]>([]);
  const location = useAppSelector(selectLatLong);
  const [userPos, setUserPos] = useState<number[]>(location);
  const [locError, setHasLocError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (page === 1) {
      if (location.length === 0) {
        navigator.geolocation.getCurrentPosition(
          (loc) => {
            dispatch(
              setLocation({
                long: loc.coords.longitude,
                lat: loc.coords.latitude,
              })
            );
          },
          () => setHasLocError(true)
        );
      }
      if (userPos.length === 0 && location.toString() !== userPos.toString()) {
        setUserPos(location);
      }
    }
  }, [page, location, userPos, dispatch]);

  const getPage = () => {
    switch (page) {
      case 0:
        return <PickConsole active={active} setActive={setActive} />;
      case 1:
        return (
          <PickLocation pos={userPos} setPos={setUserPos} error={locError} />
        );
      default:
        return <PickUsername username={username} setUsername={setUsername} />;
    }
  };

  const onNextClick = () => {
    if (page === 0) {
      dispatch(actSetUserPlatforms(active));
    }
    if (page === 1) {
      dispatch(actSetUserLocation(userPos));
    }
    if (page === 2) {
      dispatch(actSetUsername(username));
      return;
    }
    setPage((d) => d + 1);
  };

  const isNextDisabled = () => {
    if (page === 0) {
      if (active.length === 0) {
        return true;
      }
    }
    if (page === 1) {
      return locError;
    }
    return false;
  };

  return (
    <Modal isOpen onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <VStack py={4} spacing={2}>
            <HStack h={10} w="100%">
              <IconButton
                isRound
                pointerEvents="none"
                icon={<FaGamepad />}
                aria-label="Console"
                _focus={{ outline: 'none' }}
                bg={page === 0 ? 'accent' : 'whiteAlpha.200'}
              />
              <Divider />
              <IconButton
                isRound
                pointerEvents="none"
                icon={<TiLocation />}
                aria-label="Location"
                bg={page === 1 ? 'accent' : 'whiteAlpha.200'}
              />
              <Divider />
              <IconButton
                isRound
                pointerEvents="none"
                icon={<FaUser />}
                aria-label="Username"
                bg={page === 2 ? 'accent' : 'whiteAlpha.200'}
              />
            </HStack>
            {getPage()}
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          {page !== 0 ? (
            <Button onClick={() => setPage((d) => d - 1)}>Previous</Button>
          ) : (
            <div />
          )}
          <Button isDisabled={isNextDisabled()} onClick={onNextClick}>
            {page !== 2 ? 'Next' : 'Done'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
