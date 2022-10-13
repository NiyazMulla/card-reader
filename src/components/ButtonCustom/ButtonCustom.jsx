import React from "react";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
function ButtonCustom(props) {
  const { color } = props;
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: color ? color : "#00B16A",
          color: color ? "black" : "white",
        }}
        onClick={props.onClick}
      >
        {" "}
        {props.label}{" "}
      </Button>
    </>
  );
}

export default ButtonCustom;
