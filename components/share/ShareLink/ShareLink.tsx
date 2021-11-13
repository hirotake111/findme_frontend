import { TextField } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import styles from "./ShareLink.module.css";
import { MouseEventHandler } from "react";

export default function ShareLink({ link }: { link: string }) {
  const handleclick: MouseEventHandler = () => {
    // copy link to clipboard
    navigator.clipboard.writeText(link);
  };

  return (
    <>
      {link ? (
        <>
          <label className={styles.linkLabel}>
            DONE! You can share the link below:
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
      ) : (
        ""
      )}
    </>
  );
}
