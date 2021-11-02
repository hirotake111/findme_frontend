import { useAppSelector } from "../../../hooks/reduxHooks";

import styles from "./SearchMessage.module.css";

export default function SearchMessage() {
  const { status } = useAppSelector((state) => state.map);

  return status.status === "searching" ? (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.item}>Searching now...</div>
      </div>
    </div>
  ) : status.status === "error" ? (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.item_error}>ERROR: {status.detail}</div>
      </div>
    </div>
  ) : null;
}
