import React, { ReactElement } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { AskLocation } from '../components/AskLocation';
import { MapView, MapViewProps } from './MapView';

export const MapListings = (props: MapViewProps): ReactElement => {
  const hasLocation = useAppSelector((state) => state.app.hasLocation);
  if (hasLocation) {
    return <MapView onMarkerClick={props.onMarkerClick} />;
  }
  return <AskLocation />;
};
