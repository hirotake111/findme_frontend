import { TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function ShareLink({ link }: { link: string }) {
  return (
    <>
      {link ? (
        <>
          <span>You can share the link below:</span>
          <br />
          <div style={{ display: "flex" }}>
            <TextField variant="standard" disabled={true} value={link} />
            <ContentCopyIcon />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
