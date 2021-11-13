import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useGetCodeModal } from "../../../hooks/getCodeModalHooks";

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

export default function CodeModal() {
  const [
    { modalEnabled, submitButtonEnabled, errorMessage, textRef },
    getDestinationByCode,
  ] = useGetCodeModal();

  const handleClick = () => {
    getDestinationByCode();
  };

  return (
    <Modal
      open={modalEnabled}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Code required:
        </Typography>
        <TextField
          id="outlined-basic"
          label="Enter code here"
          variant="outlined"
          inputRef={textRef}
        />
        <p>
          <Button
            variant="outlined"
            disabled={!submitButtonEnabled}
            onClick={handleClick}
          >
            Verify
          </Button>
        </p>
        <Typography style={{ color: "#fa86a7" }}>{errorMessage}</Typography>
      </Box>
    </Modal>
  );
}
