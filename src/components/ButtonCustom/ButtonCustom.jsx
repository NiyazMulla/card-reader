import React from "react";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
function ButtonCustom(props) {
  return (
    <>
      <Button
        variant="contained"
        style={{ backgroundColor: "#00B16A" }}
        onClick={props.onClick}
      >
        {" "}
        {props.label}{" "}
      </Button>
    </>
  );
}

export default ButtonCustom;
