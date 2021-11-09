import { useEffect } from "react";
import { setPosition } from "../utils/location";
import { Position } from "../utils/types";
import { useAppSelector } from "./reduxHooks";

/**
 * custom hook to update and return current position
 */
export const useUpdateCurrentPosition = (): Position => {
  const { position, direction } = useAppSelector((state) => state.map);

  useEffect(() => {
    // render Google Maps
    setPosition({ position, destination: direction });
  }, [position, direction]);

  return position;
};
