import { BellIcon, EmailIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Avatar,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { BadgeIcon } from '../../components/BadgeIcon';

export const Header = (): ReactElement => {
  return (
    <HStack h={16} shadow="lg" px={4} spacing={4}>
      <Image h={12} w={12} src="/assets/logo.svg" />
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search" />
        <InputRightElement>
          <Spinner />
        </InputRightElement>
      </InputGroup>
      <HStack spacing={2}>
        <BadgeIcon icon={BellIcon} label="Notifications" count={3} />
        <BadgeIcon icon={EmailIcon} label="Messages" count={4} />
        <IconButton
          variant="ghost"
          icon={<Avatar size="xs" />}
          aria-label="Profile"
          rounded="xl"
        />
      </HStack>
    </HStack>
  );
};
