import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLocation } from '../../app/appSlice';

export const AskLocation = (): ReactElement => {
  const hasNavigator = useAppSelector((state) => state.app.hasNavigator);
  const dispatch = useAppDispatch();
  const [hasError, setHasError] = useState(false);
  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          setLocation({ long: pos.coords.longitude, lat: pos.coords.latitude })
        );
      },
      () => setHasError(true)
    );
  }, [dispatch]);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((perm) => {
        if (perm.state === 'granted') {
          getLocation();
        }
      });
    }
  }, [getLocation]);

  const btnText = hasNavigator
    ? 'Enable Location'
    : 'Location not supported on your device';

  return (
    <VStack
      h="100%"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      mx="auto"
    >
      {hasError ? (
        <Text justifySelf="center">Unable to access your location</Text>
      ) : (
        <>
          <Heading size="2xl">View games posted near you</Heading>
          <Button
            isDisabled={!hasNavigator}
            onClick={getLocation}
            bgColor="green.400"
            color="white"
            _hover={{
              bgColor: 'green.500',
            }}
            _active={{
              bgColor: 'green.600',
            }}
          >
            {btnText}
          </Button>
        </>
      )}
    </VStack>
  );
};
