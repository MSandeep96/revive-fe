import { Flex, Skeleton } from '@chakra-ui/react';
import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Header } from '../header/Header';
import { NewUserModal } from '../newUser/NewUserModal';
import {
  actFetchUserProfile,
  selectHasUserError,
  selectIsUserLoading,
} from '../user/userSlice';
import { Content } from './Content';

export const Home = (): ReactElement => {
  const dispatch = useAppDispatch();
  const hasUserProfile = useAppSelector((state) => state.user.hasProfile);
  const isUserLoading = useAppSelector(selectIsUserLoading);
  const isNewUser = useAppSelector((state) => state.user.user?.isNewUser);
  const hasUserProfileError = useAppSelector(selectHasUserError);

  const getContent = () => {
    if (isNewUser) {
      return <NewUserModal />;
    }
    if (!hasUserProfile) {
      return null;
    }
    return (
      <Skeleton isLoaded={!isUserLoading} h="100%" w="100%">
        <Content />
      </Skeleton>
    );
  };

  useEffect(() => {
    dispatch(actFetchUserProfile());
  }, [dispatch]);
  return (
    <Flex flexDir="column" h="100vh">
      <Header />
      <Flex flexGrow={1} m={4} shadow="xl">
        {getContent()}
      </Flex>
    </Flex>
  );
};
