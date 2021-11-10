import { useGetCurrentPosition } from "../../../hooks/searchHooks";

/**
 * This component runs useEffect to get current position from navigator.geolocation
 */
export default function Geolocation() {
  useGetCurrentPosition();

  return null;
}
