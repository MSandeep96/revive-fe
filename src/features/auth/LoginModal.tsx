import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import React, { ChangeEventHandler, ReactElement, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeEmailAuthModal, closeLoginModal, showEmailAuthModal } from '../app/appSlice';
import { EmailAuthModal } from './EmailAuthModal'

export const LoginModal = (): ReactElement => {
  const showLoginModal = useAppSelector((state) => state.app.showLoginModal);
  const viewEmailAuthModal = useAppSelector((state) => state.app.showEmailAuthModal);
  const isSignUp = useAppSelector((state) => state.app.isSignUp);
  const [phN, setPhN] = useState('');

  const dispatch = useAppDispatch();

  const labelText = isSignUp ? 'Up' : 'In';

  const onGoogleLogin = () => {
    window.location.replace('http://localhost:3000/auth/google');
  };

  const onPhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.currentTarget.value.replace(/\D/g, "");
    if (val.length < 11) {
      setPhN(val);
    }
  };

  const onEmailLogin = () => {
    dispatch(showEmailAuthModal(true))
  }

  const closeModal = () => {
    dispatch(closeLoginModal())
    dispatch(closeEmailAuthModal())
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={showLoginModal}
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader shadow="xl">
          <Text>{`Sign ${labelText}`}</Text>
        </ModalHeader>
        <ModalCloseButton />
        {viewEmailAuthModal ?
          <EmailAuthModal /> :
          <ModalBody display="flex" flexDir="column" alignItems="center" mb={2}>
            <FormControl
              display="flex"
              flexDir="column"
              alignItems="center"
              mt={4}
            >
              <FormLabel alignSelf="flex-start">{`Sign ${labelText.toLowerCase()} with your phone number`}</FormLabel>
              <InputGroup mt={1}>
                <InputLeftAddon>+91</InputLeftAddon>
                <Input
                  placeholder="Phone number"
                  value={phN}
                  onChange={onPhoneChange}
                />
              </InputGroup>
              <Button mx="auto" mt={6} mb={2} bg="green.400">
                Generate OTP
              </Button>
            </FormControl>
            <Flex alignItems="center" my={2} w="100%">
              <Divider />
              <Text mx={2}>or</Text>
              <Divider />
            </Flex>
            <Button
              my={2}
              mx="auto"
              bg="white"
              color="gray.800"
              onClick={onEmailLogin}
            >
              Continue with Email
            </Button>
            <Button
              my={2}
              mx="auto"
              bg="white"
              color="gray.800"
              onClick={onGoogleLogin}
            >
              Continue with Google
          </Button>
          </ModalBody>}
      </ModalContent>
    </Modal>
  );
};
