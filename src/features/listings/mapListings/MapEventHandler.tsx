import { LatLng } from 'leaflet';
import { useCallback, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useAppDispatch } from '../../../redux/hooks';
import { actFetchListingsForLocation } from '../nearbyListingSlice';

export const MapEventHandler = (): null => {
  const map = useMap();
  const dispatch = useAppDispatch();

  const prevCenter = useRef<LatLng | undefined>();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const dragEnd = useCallback(() => {
    if (
      prevCenter.current &&
      prevCenter.current.toString() === map.getCenter().toString()
    ) {
      return;
    }
    prevCenter.current = map.getCenter();
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(
      () => dispatch(actFetchListingsForLocation(map.getCenter())),
      2000
    );
  }, [dispatch, map]);

  useEffect((): any => {
    map.on('dragend', dragEnd);
    return () => map.removeEventListener('dragend', dragEnd);
  }, [dragEnd, map]);

  // prevents gray tiles in map
  setTimeout(() => map.invalidateSize(), 100);
  return null;
};
