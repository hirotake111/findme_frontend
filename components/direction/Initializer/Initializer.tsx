import { useUpdateDirection } from "../../../hooks/directionHooks";

interface Props {
  positionId: string;
}

/**
 * fetch other user's position data from API server
 */
export default function Initializer({ positionId }: Props) {
  useUpdateDirection(positionId);
  return null;
}
