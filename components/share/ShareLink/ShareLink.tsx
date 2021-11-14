import { MouseEventHandler } from "react";
import { TextField } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import CopyMessage from "../CopyMessage/CopyMessage";
import { useCopyMessageHandler } from "../../../hooks/linkModalHooks";

import styles from "./ShareLink.module.css";

export default function ShareLink({ link }: { link: string }) {
  const popUp = useCopyMessageHandler();

  const handleclick: MouseEventHandler = () => {
    // copy link to clipboard
    navigator.clipboard.writeText(link);
    // show message
    popUp();
  };

  return (
    <>
      {link ? (
        <>
          <CopyMessage />
          <label className={styles.linkLabel}>
            DONE! Your link is available for 5 minutes.
            <br />
            You can click/tap link below to share:
          </label>
          <br />
          <div
            className={styles.clickPoint}
            onClick={handleclick}
            data-testid="clickevent"
          ></div>
          <div className={styles.container}>
            <div className={styles.textFieldWrapper}>
              <TextField
                variant="standard"
                disabled={true}
                value={link}
                fullWidth={true}
                size="small"
              />
            </div>
            <div className={styles.copyIconWrapper}>
              <ContentCopyRoundedIcon />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
