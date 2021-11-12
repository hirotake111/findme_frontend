import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useLinkModal } from "../../../hooks/linkModalHooks";

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
  const [link, ref, func] = useLinkModal();

  const handleClick = () => {
    console.log("clicked!");
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
        <TextField
          id="outlined-basic"
          label="Enter code here"
          variant="outlined"
          // inputRef={textRef}
        />
        <p>
          <Button
            variant="outlined"
            disabled={link.submitStatus === "stop"}
            onClick={handleClick}
          >
            Verify
          </Button>
        </p>
        <Typography style={{ color: "#fa86a7" }}>{""}</Typography>
      </Box>
    </Modal>
  );
}
