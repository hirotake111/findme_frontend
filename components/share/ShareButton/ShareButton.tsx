import { Fab } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

import styles from "./ShareButton.module.css";
import { useModalEnabled } from "../../../hooks/linkModalHooks";
import { useAppSelector } from "../../../hooks/reduxHooks";

export default function ShareButton() {
  const enable = useModalEnabled();
  const { positionId } = useAppSelector((state) => state.getCodeModal);

  return (
    <>
      {!positionId ? (
        <div className={styles.container}>
          <Fab color="secondary" variant="extended" onClick={enable}>
            <ShareIcon sx={{ mr: 1 }} />
            Share
          </Fab>
        </div>
      ) : null}
    </>
  );
}
