import { Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Platform } from '../../app/appTypes';
import { getPlatformDisplayName } from '../../platform/platformUtil';

type PickConsoleProps = {
  active: Platform[];
  setActive: React.Dispatch<React.SetStateAction<Platform[]>>;
};

export const PickConsole = ({ active, setActive }: PickConsoleProps) => {
  const consoles = [
    Platform.PS4,
    Platform.XBOX_1,
    Platform.PS5,
    Platform.XBOX_X,
  ];
  const set = new Set(active);

  const onClick = (platform: Platform) => {
    if (set.has(platform)) {
      set.delete(platform);
    } else {
      set.add(platform);
    }
    setActive(Array.from(set.values()));
  };

  return (
    <VStack alignItems="flex-start" w="100%" spacing={4}>
      <Text>Please pick the consoles you own</Text>
      <SimpleGrid columns={2} alignSelf="center" spacing={2} w="100%">
        {consoles.map((cons, i) => (
          <Button
            isFullWidth
            isActive={set.has(cons)}
            _focus={{ outline: 'none' }}
            _active={i % 2 === 1 ? { bg: 'xbox' } : { bg: 'ps' }}
            onClick={() => onClick(cons)}
          >
            {getPlatformDisplayName(cons)}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
