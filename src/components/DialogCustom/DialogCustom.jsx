import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogCustom(props) {
  const { open, handleClose, headerData } = props;
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"sm"}
        fullWidth={"1"}
      >
        <DialogTitle className="fw-bold  d-flex justify-content-between">
          {headerData}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
}
