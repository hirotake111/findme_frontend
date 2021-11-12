import { useAppSelector } from "../../../hooks/reduxHooks";

import styles from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  const { errorMessage } = useAppSelector((state) => state.map);

  return errorMessage ? (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.item_error}>ERROR: {errorMessage}</div>
      </div>
    </div>
  ) : null;
}
