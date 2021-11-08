import { useEffect } from "react";
import { setPosition } from "../utils/location";
import { Position } from "../utils/types";
import { useAppSelector } from "./reduxHooks";

/**
 * custom hook to update and return current position
 */
export const useUpdateCurrentPosition = (): Position => {
  const { latitude, longitude } = useAppSelector((state) => state.map.position);

  useEffect(() => {
    setPosition({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  return { latitude, longitude };
};
