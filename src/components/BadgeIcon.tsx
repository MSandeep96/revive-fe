import { Box, IconButton, IconProps, Tag, TagLabel } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type BadgeIconProps = {
  icon: React.FC<IconProps>;
  label: string;
  count: number;
};

export const BadgeIcon = ({
  icon: Icon,
  label,
  count,
}: BadgeIconProps): ReactElement => {
  return (
    <Box pos="relative">
      <IconButton
        icon={<Icon w={6} h={6} />}
        aria-label={label}
        variant="ghost"
        rounded="xl"
      />
      <Tag
        size="sm"
        pos="absolute"
        right="0"
        borderRadius="full"
        bg="green.400"
      >
        <TagLabel>{count}</TagLabel>
      </Tag>
    </Box>
  );
};
