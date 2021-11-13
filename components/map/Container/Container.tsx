import { useUpdateCurrentPosition } from "../../../hooks/positionHooks";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import ShareButton from "../../share/ShareButton/ShareButton";
import styles from "./Container.module.css";

export default function Container() {
  const { latitude } = useUpdateCurrentPosition();

  return latitude === -200 ? (
    <LoadingSpinner />
  ) : (
    <>
      <ShareButton />
      <div className={styles.map} id="map"></div>
    </>
  );
}
