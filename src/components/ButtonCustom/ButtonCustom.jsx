import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
function ButtonCustom(props) {
  const { color } = props;
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: color ? color : "#00B16A",
          color: color ? "black" : "white",
          minWidth: "10rem",
        }}
        onClick={props.onClick}
        disabled={props.disabled || props.showLoader}
      >
       
        {props.showLoader ? <CircularProgress size={'2rem'} color="info" />  : props.label}
        
      </Button>
    </>
  );
}

export default ButtonCustom;
