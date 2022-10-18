import React from "react";
import Skeleton from "@mui/material/Skeleton";
function SkeltonCustom(props) {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        animation="wave"
        className="w-100 mb-2"
        {...props}
      />
    </div>
  );
}

export default SkeltonCustom;
