import React, { useEffect } from "react";

import { useAppSelector } from "../../../hooks/reduxHooks";
import { setPosition } from "../../../utils/location";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import styles from "./Container.module.css";

export default function Container() {
  const { latitude, longitude } = useAppSelector((state) => state.map.position);

  useEffect(() => {
    setPosition({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  return latitude === -200 ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.map} id="map"></div>
  );
}
