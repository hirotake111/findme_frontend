import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useLinkModal } from "../../../hooks/linkModalHooks";
import ShareLink from "../../share/ShareLink/ShareLink";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};

export default function LinkModal() {
  const [link, ref, create] = useLinkModal();

  const handleClick = () => {
    create();
  };

  return (
    <Modal
      open={link.modalEnabled}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Share Link
        </Typography>
        <p>
          You can protect link by entering code here.
          <span style={{ fontSize: "0.7rem" }}>
            (More than 3 characters / alphabets and numbers only.)
          </span>
        </p>
        <TextField
          id="outlined-basic"
          label="Enter code here"
          variant="outlined"
          inputRef={ref}
        />
        <p>
          <Button
            variant="outlined"
            disabled={link.submitStatus !== "stop"}
            onClick={handleClick}
          >
            Share
          </Button>
        </p>
        <Typography style={{ color: "#fa86a7" }}>
          {link.errorMessage}
        </Typography>
        <ShareLink link={link.link} />
      </Box>
    </Modal>
  );
}
