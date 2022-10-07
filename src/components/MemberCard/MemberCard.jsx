import React from "react";
import GirlIcon from "@mui/icons-material/Girl";
import WomanIcon from "@mui/icons-material/Woman";
import Woman2Icon from "@mui/icons-material/Woman2";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import BoyIcon from "@mui/icons-material/Boy";
import ManIcon from "@mui/icons-material/Man";
import Man2Icon from "@mui/icons-material/Man2";
import ElderlyIcon from "@mui/icons-material/Elderly";
import Person2Icon from "@mui/icons-material/Person2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const AGE_MAP = {
  MALE: {
    15: BoyIcon,
    30: ManIcon,
    59: Man2Icon,
    100: ElderlyIcon,
  },
  FEMALE: {
    15: GirlIcon,
    30: WomanIcon,
    59: Woman2Icon,
    100: ElderlyWomanIcon,
  },
};

function MemberCard(props) {
  const getIconImage = () => {
    const { age, gender } = props;
    let IconToReturn = "";

    if (age <= 15) {
      IconToReturn = AGE_MAP[gender][15];
    } else if (age <= 30) IconToReturn = AGE_MAP[gender][30];
    else if (age <= 59) IconToReturn = AGE_MAP[gender][59];
    else if (age <= 100) IconToReturn = AGE_MAP[gender][100];

    return IconToReturn;
  };

  const { name, gender, age, adharNo, mobileNumber, relationShip } = props;
  let Icon = getIconImage();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    debugger;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="border d-flex flex-column border w-full">
      <div className="d-flex flex-row px-2 justify-content-between align-items-center fs-2 border-bottom border-2 mb-4">
        <div>
          {Icon ? (
            <Icon style={{ fontSize: "50px", color: "#273196" }} />
          ) : (
            <Person2Icon />
          )}{" "}
          <span>{name}</span>
        </div>
        <div>
          <div
            style={{ cursor: "pointer" }}
            aria-describedby={id}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Verify Adhar</Typography>
          </Popover>
        </div>
      </div>

      <div className="w-100 d-flex flex-column px-2">
        <div className="w-100 d-flex flex-row justify-content-start mb-2">
          <div className="w-50 fs-6">Gender: {gender ?? "N/A"}</div>
          <div className="w-50 fs-6">Age: {age ?? "N/A"}</div>
        </div>
        <div className="d-flex flex-row justify-content-start mb-2">
          <div className="w-50 fs-6">Adhar Number: {adharNo ?? "N/A"}</div>
          <div className="w-50 fs-6">
            Mobile Number: {mobileNumber ?? "N/A"}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-start mb-2">
          <div className="w-50 fs-6">R/F: {relationShip ?? "N/A"}</div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
