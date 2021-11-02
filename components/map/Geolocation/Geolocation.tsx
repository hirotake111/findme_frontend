import { useEffect } from "react";
import { useGetCurrentPosition } from "../../../hooks/searchHooks";

/**
 * This component runs useEffect to get current position from navigator.geolocation
 */
export default function Geolocation() {
  const getCurrentPosition = useGetCurrentPosition();
  useEffect(() => {
    getCurrentPosition();
  }, []);

  return null;
}
