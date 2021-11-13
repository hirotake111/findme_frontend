import { Fab } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

import styles from "./ShareButton.module.css";

export default function ShareButton() {
  return (
    <div className={styles.container}>
      <Fab color="secondary" variant="extended">
        <ShareIcon sx={{ mr: 1 }} />
        Share
      </Fab>
    </div>
  );
}
