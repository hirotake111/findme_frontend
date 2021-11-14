import { useAppSelector } from "../../../hooks/reduxHooks";
import Chip from "@mui/material/Chip";

import styles from "./CopyMessage.module.css";

export default function CopyMessage() {
  const { copyMessage } = useAppSelector((state) => state.link);

  return (
    <>
      {copyMessage ? (
        <div className={styles.messageContainer}>
          <Chip label="Copied to clipboard!" color="secondary" />
        </div>
      ) : null}
    </>
  );
}
