import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import React, { ChangeEventHandler, ReactElement } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { ApiState } from '../../../util/apiTypes';

type PickUsernameProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export const PickUsername = ({
  username,
  setUsername,
}: PickUsernameProps): ReactElement => {
  const hasError = useAppSelector(
    (state) => state.user.usernameApiState.status === ApiState.FAILED
  );
  const error = useAppSelector((state) => state.user.usernameApiState.error);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.currentTarget.value;
    if (/^[a-z0-9]+$/i.test(val)) {
      setUsername(val);
    }
  };

  return (
    <Box w="100%">
      <FormControl isInvalid={hasError}>
        <FormControl>Pick a username</FormControl>
        <Input onChange={onChange} value={username} placeholder="Username" />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
