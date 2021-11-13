import { Fab } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

import styles from "./ShareButton.module.css";
import { useModalEnabled } from "../../../hooks/linkModalHooks";

export default function ShareButton() {
  const enableModal = useModalEnabled();

  return (
    <div className={styles.container}>
      <Fab color="secondary" variant="extended" onClick={enableModal}>
        <ShareIcon sx={{ mr: 1 }} />
        Share
      </Fab>
    </div>
  );
}
