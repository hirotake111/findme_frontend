import { useUpdateCurrentPosition } from "../../../hooks/positionHooks";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import styles from "./Container.module.css";

export default function Container() {
  const { latitude } = useUpdateCurrentPosition();

  return latitude === -200 ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.map} id="map"></div>
  );
}
