import { Box, Text } from '@chakra-ui/react';
import { LatLngTuple } from 'leaflet';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type PickLocationProps = {
  pos: number[];
  setPos: React.Dispatch<React.SetStateAction<number[]>>;
  error: boolean;
};

type PickLocationMapHandlerProps = Pick<PickLocationProps, 'setPos'>;

export const PickLocationMapHandler = ({
  setPos,
}: PickLocationMapHandlerProps): null => {
  const map = useMap();

  const drag = useCallback(() => {
    setPos([map.getCenter().lat, map.getCenter().lng]);
  }, [map, setPos]);

  useEffect((): any => {
    map.on('drag', drag);
    return () => map.removeEventListener('drag', drag);
  }, [drag, map]);

  // prevents gray tiles in map
  setTimeout(() => map.invalidateSize(), 100);
  return null;
};

export const PickLocation = ({
  pos,
  setPos,
  error,
}: PickLocationProps): ReactElement => {
  const [draggable, setDraggable] = useState(false);

  if (error || pos.length !== 2) {
    return <Text>Unable to access your location</Text>;
  }
  return (
    <>
      <Box w="100%" h="300px">
        <MapContainer
          style={{ height: '100%', width: '100%', borderRadius: '10px' }}
          center={pos as LatLngTuple}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker draggable={draggable} position={pos as LatLngTuple} />
          <PickLocationMapHandler setPos={setPos} />
        </MapContainer>
      </Box>
    </>
  );
};
