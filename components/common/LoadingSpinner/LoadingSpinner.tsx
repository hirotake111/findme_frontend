import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__main}></div>
      <div className={styles.spinner__text}>Loading</div>
    </div>
  );
}
