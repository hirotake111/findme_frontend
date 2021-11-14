import { TextField } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import styles from "./ShareLink.module.css";
import { MouseEventHandler } from "react";
import CopyMessage from "../CopyMessage/CopyMessage";
import { useAppDispatch } from "../../../hooks/reduxHooks";

export default function ShareLink({ link }: { link: string }) {
  const dispatch = useAppDispatch();

  const handleclick: MouseEventHandler = () => {
    // copy link to clipboard
    navigator.clipboard.writeText(link);
    // update copy message
    dispatch({
      type: "share/updateCopyMessage",
      payload: { enabled: true },
    });
  };

  return (
    <>
      {link ? (
        <>
          <CopyMessage />
          <label className={styles.linkLabel}>
            DONE! Your link is available for 5 minutes.
            <br />
            You can share the link below:
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
