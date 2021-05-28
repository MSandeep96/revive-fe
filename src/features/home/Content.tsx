import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { FilterListings } from '../listings/filterListings/FilterListings';
import { MapListings } from '../listings/mapListings/MapListings';
import { openDrawerListingModal } from '../listings/nearbyListingSlice';

export const Content = (): ReactElement => {
  return (
    <Tabs variant="enclosed" display="flex" flexDir="column" h="100%" isLazy>
      <TabList>
        <Tab>Nearby</Tab>
        <Tab>Map</Tab>
      </TabList>
      <TabPanels
        flexGrow={1}
        border="1px solid"
        borderColor="inherit"
        borderTopColor="transparent"
      >
        <TabPanel>
          <FilterListings />
        </TabPanel>
        <TabPanel display="flex" h="100%" p={0}>
          <MapListings onMarkerClick={openDrawerListingModal} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
